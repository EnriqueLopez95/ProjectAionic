import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [

      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'pagina1',
        loadChildren: () => import('./pagina1/pagina1.module').then( m => m.Pagina1PageModule)
      },
      {
        path: 'pagina3',
        loadChildren: () => import('./pagina3/pagina3.module').then( m => m.Pagina3PageModule)
      },  
      {
        path: 'pagina6',
        children: [
          {
            path: "",
            loadChildren: () => import('./pagina6/pagina6.module').then( m => m.Pagina6PageModule)
          },
          {
            path: ':pagina6Id',
            loadChildren: () => import('./pagina6/pagina-details/pagina-details.module').then( m => m.PaginaDetailsPageModule)
          }
        ]
      }
    ]
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
