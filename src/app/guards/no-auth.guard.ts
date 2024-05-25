

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  // Inyección de dependencias para los servicios de Firebase y utilidades
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Retorna una promesa que se resolverá dependiendo del estado de autenticación
    return new Promise((resolve) => {
      // Verifica el estado de autenticación del usuario
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (!auth) {
          resolve(true); // Si el usuario no está autenticado, permite el acceso
        } else {
          this.utilsSvc.routerLink('/main/home'); // Si el usuario está autenticado, redirige a la página principal
          resolve(false); // Deniega el acceso
        }
      });
    });
  }
}