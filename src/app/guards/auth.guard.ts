import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyección de dependencias para los servicios de Firebase y utilidades
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Obtiene el usuario almacenado en localStorage
    let user = localStorage.getItem('user');
    
    // Retorna una promesa que se resolverá dependiendo del estado de autenticación
    return new Promise((resolve) => {
      // Verifica el estado de autenticación del usuario
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth) {
          if (user) resolve(true); // Si el usuario está autenticado y existe en localStorage, permite el acceso
        } else {
          this.firebaseSvc.signOut(); // Si no está autenticado, cierra sesión
          resolve(false); // Deniega el acceso
        }
      });
    });
  }
}