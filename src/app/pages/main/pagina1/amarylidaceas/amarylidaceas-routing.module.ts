import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmarylidaceasPage } from './amarylidaceas.page';

const routes: Routes = [
  {
    path: '',
    component: AmarylidaceasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmarylidaceasPageRoutingModule {}
