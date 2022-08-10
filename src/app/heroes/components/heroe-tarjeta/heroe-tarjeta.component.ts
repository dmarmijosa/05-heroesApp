import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card{
    margin-top:20px
  }
`
  ]
})
export class HeroeTarjetaComponent  {
  @Input() heroe!:Heroe;


  longitudPersonaje(personajes:string):number{
    let array=personajes.split(',');
    return array.length;
    
  }

  heroesMapa={
    '=0':'',
    '=1':'Personaje:',   
    'other': 'Personajes:'
  }
}
