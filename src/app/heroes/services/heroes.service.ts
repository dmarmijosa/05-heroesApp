import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private base_url:string = environment.base_url
  
  constructor(private http:HttpClient) {
    
   }

  getHeroes():Observable<Heroe[]>{
    
    return this.http.get<Heroe[]>(`${this.base_url}/heroes`);
  }
  getHeroeByID(id:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.base_url}/heroes/${id}`);
  }

  getSurgerencias(termino:string):Observable<Heroe[]>| null{
    return this.http.get<Heroe[]>(`${this.base_url}/heroes/?q=${termino}&_limit=6`);
  }


  
}
