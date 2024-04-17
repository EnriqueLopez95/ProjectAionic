import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolanaceasPage } from './solanaceas.page';

const routes: Routes = [
  {
    path: '',
    component: SolanaceasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolanaceasPageRoutingModule {}
