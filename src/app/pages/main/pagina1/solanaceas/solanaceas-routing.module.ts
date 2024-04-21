import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { solanaceasPage } from './solanaceas.page';

const routes: Routes = [
  {
    path: '',
    component: solanaceasPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class solanaceasPageRoutingModule {}
