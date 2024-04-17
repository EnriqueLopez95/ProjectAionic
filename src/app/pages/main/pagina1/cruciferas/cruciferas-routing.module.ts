import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CruciferasPage } from './cruciferas.page';

const routes: Routes = [
  {
    path: '',
    component: CruciferasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CruciferasPageRoutingModule {}
