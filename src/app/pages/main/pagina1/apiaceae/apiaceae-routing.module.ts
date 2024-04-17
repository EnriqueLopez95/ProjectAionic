import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiaceaePage } from './apiaceae.page';

const routes: Routes = [
  {
    path: '',
    component: ApiaceaePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiaceaePageRoutingModule {}
