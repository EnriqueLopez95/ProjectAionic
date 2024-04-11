import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
pages = [
  {title: 'Inicio', url: '/main/home', icon: 'home-outline'},
  {title: 'Cultivos', url: '/main/pagina1', icon: 'nutrition-outline'},
  {title: 'Proteccion de Cultivos', url: '/main/pagina2', icon: 'leaf-outline'},
  {title: 'Campo Abierto', url: '/main/pagina3', icon: 'leaf-sharp'},
  {title: 'Cosecha', url: '/main/pagina4', icon: 'flower-sharp'},
  {title: 'Postcosecha', url: '/main/pagina5', icon: 'flower-outline'},
  {title: 'Riesgos', url: '/main/pagina6', icon: 'bug-outline'}




 
]

router= inject(Router);
firebaseSvc = inject(FirebaseService);
utilsSvc = inject(UtilsService);

currentPath: string = '';

  ngOnInit() {

    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;

    })
  }


  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  //============== Cerrar Sesion ====================
  signOut(){
    this.firebaseSvc.signOut();
  }

}
