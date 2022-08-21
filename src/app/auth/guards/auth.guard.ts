import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {
  constructor(private authService:AuthService,
              private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean > | boolean  {
      /* if(this.authService.auth.id){

        return true;
      }else{
        console.log('Bloqueado por el servicio de AuthGuard - canActivate')
        return false;
      } */
      return this.authService.verificarAuth()
            .pipe(
              tap(estaAutentificado=>{
                if(!estaAutentificado){
                  this.router.navigate(['./auth/login'])
                }
              })
  
            )
  }
 
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean > | boolean  {
      /* console.log('calLoad', true)
      console.log(route)
      console.log(segments) */
      return this.authService.verificarAuth()
              .pipe(
                tap(estaAutentificado=>{
                  if(!estaAutentificado){
                    this.router.navigate(['./auth/login'])
                  }
                })
        
              )
      /* if(this.authService.auth.id){

        return true;
      }else{
        console.log('Bloqueado por el servicio de AuhGuard -  CanLoad')
        return false;
      } */
  }
}
