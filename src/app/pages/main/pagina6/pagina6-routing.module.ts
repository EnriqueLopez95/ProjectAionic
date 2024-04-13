import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pagina6Page } from './pagina6.page';

const routes: Routes = [
  {
    path: '',
    component: Pagina6Page
  },  {
    path: 'pagina-details',
    loadChildren: () => import('./pagina-details/pagina-details.module').then( m => m.PaginaDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pagina6PageRoutingModule {}
