import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pagina1Page } from './pagina1.page';

const routes: Routes = [
  {
    path: '',
    component: Pagina1Page
  },  {
    path: 'solanaceas',
    loadChildren: () => import('./solanaceas/solanaceas.module').then( m => m.SolanaceasPageModule)
  },
  {
    path: 'cucurbitaceas',
    loadChildren: () => import('./cucurbitaceas/cucurbitaceas.module').then( m => m.CucurbitaceasPageModule)
  },
  {
    path: 'cruciferas',
    loadChildren: () => import('./cruciferas/cruciferas.module').then( m => m.CruciferasPageModule)
  },
  {
    path: 'apiaceae',
    loadChildren: () => import('./apiaceae/apiaceae.module').then( m => m.ApiaceaePageModule)
  },
  {
    path: 'amarylidaceas',
    loadChildren: () => import('./amarylidaceas/amarylidaceas.module').then( m => m.AmarylidaceasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pagina1PageRoutingModule {}
