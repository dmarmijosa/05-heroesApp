import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'

    }
  ]
  heroe: Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:'',
  }

  constructor(private heroeService:HeroesService, 
              private actvatedRouter:ActivatedRoute,
              private router:Router,
              private snackBar:MatSnackBar,
              private dialog:MatDialog
              ) { }



  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return;
    }
     this.actvatedRouter.params.pipe(
      switchMap(({id})=>this.heroeService.getHeroeByID(id))
    ).subscribe(heroe=> this.heroe=heroe) 
  }
  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }

    if(this.heroe.id){
      this.heroeService.putHeroe(this.heroe).subscribe({
        next: (resp=>{
          this.mostrarSnackBar('Registro actualizado')
        })
      })
    }else{
      this.heroeService.posHeroe(this.heroe).subscribe({
        next: (heroe)=>{
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Registro creado');
        }
      });
    }

    /* this.heroe={
      superhero:'',
      alter_ego:'',
      characters:'',
      first_appearance:'',
      publisher: Publisher.DCComics,
      alt_img:'',
    } */

  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: {...this.heroe} //sin modificaciones 

    });
    dialog.afterClosed().pipe(
      switchMap((resp)=> (resp)? this.heroeService.deleteHeroe(this.heroe.id!): this.router.navigate([`heroes/editar/${this.heroe.id}`]) )
    ).subscribe({
      next: (hero)=>{
        console.log(hero)
        if(hero){

          this.router.navigate(['/heroes'])
        }
      }
    })

   /*  dialog.afterClosed().subscribe({
      next: (resp)=>{
        if(resp){
          this.heroeService.deleteHeroe(this.heroe.id!)
          .subscribe({
            next: (resp)=>{
              this.router.navigate(['/heroes'])
            }
          })
        }
      }
    }) */

    /*  */
  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'ok!',{
      duration:2500
    })
  }

}
