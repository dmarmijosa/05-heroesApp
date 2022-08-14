import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activaRouter:ActivatedRoute, private heroService:HeroesService, private router:Router) { }

  heroe!:Heroe;
  id:string='';

  ngOnInit(): void {
    this.activaRouter.params
      .pipe(
        switchMap(({id})=> this.heroService.getHeroeByID(id))
      ).subscribe(
        {
          next: (heroe)=>{
            this.heroe=heroe
            
          } 
        }
      )
    /* 
    this.activaRouter.params.subscribe(({id})=>{
      this.heroService.getHeroeByID(id).subscribe({
        next:(resp)=>{
          this.heroe=resp;
        }
      });
    }) */
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
    console.log(this.router.getCurrentNavigation())
  }
}

