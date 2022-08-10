import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activaRouter:ActivatedRoute) { }

  id:string='';

  ngOnInit(): void {
    this.activaRouter.params.subscribe(({id})=>{
      console.log(id)
    })
  
  }

}
