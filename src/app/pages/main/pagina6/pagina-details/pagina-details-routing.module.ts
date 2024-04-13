import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaDetailsPage } from './pagina-details.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaDetailsPageRoutingModule {}
