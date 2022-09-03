import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';
import { CharacterListComponent } from '@characters/character-list/character-list.component';


@NgModule({
  declarations: [
    CharacterDetailsComponent, CharacterListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CharacterDetailsComponent, CharacterListComponent,
  ]
})
export class CharactersModule { }
