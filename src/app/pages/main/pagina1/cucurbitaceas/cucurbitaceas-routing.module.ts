import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CucurbitaceasPage } from './cucurbitaceas.page';

const routes: Routes = [
  {
    path: '',
    component: CucurbitaceasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CucurbitaceasPageRoutingModule {}
