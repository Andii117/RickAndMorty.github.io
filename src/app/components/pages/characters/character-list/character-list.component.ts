import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/components/interfaces/character.interfaces';
import { CharacterService } from '@app/shared/services/character.service';

import { filter, take } from 'rxjs/operators';

type RequestInfo = {
  next:string
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  info: RequestInfo = {
    next: 'null',
  };

  private pageNum = 1;
  private query = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    private characterServices: CharacterService,
    private route: ActivatedRoute,
    private router:Router
  ) { 
    this.onUrlChange();
  }

  ngOnInit(): void { 
    this.getCharacterByQuery();
  }

  //Trigger cambio de la URL
  private onUrlChange(): void {
    //debugger;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        () => {
          this.characters = []; 
          this.pageNum = 1;
          this.getCharacterByQuery();
        });
  }
  
  private getCharacterByQuery():void{
    this.route.queryParams.pipe(
      take(1)).subscribe((params) => {
        console.log("params=>", params);
        this.query = params['q'];
        this.getDataFromServices();
      });
 }

  private getDataFromServices(): void{
    this.characterServices.searchCharacter(this.query, this.pageNum)
      .pipe(
        take(1)
      ).subscribe((res: any) => {

        if (res?.results?.length) {
          console.log(res);
          const { info, results } = res;
          this.characters = [...this.characters, ...results];

          this.info = info;
        } else {
          this.characters = [];
        }
      });
    this.query = '';
  }

}
