import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/components/interfaces/character.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, take } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$!: Observable<Character>;

  constructor(private route:ActivatedRoute, private characterServices:CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params:any) => {
      const id = params['id'];
      this.character$ = this.characterServices.getDetails(id);
    }
    );
  }

  onGoBack():void {
    this.location.back();
    //windows.history.back();
  }

}
