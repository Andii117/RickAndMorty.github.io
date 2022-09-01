import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Character } from '../components/interfaces/character.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }


  searchCharacter(query = '', pages = 1) {
    const filter = `${environment.baseUrlAPI}/?name=${query}&$page=${pages}`;
    return this.http.get<Character[]>(filter);
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
  }
}
