import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { solanaceasPage } from './pages/main/pagina1/solanaceas/solanaceas.page';
import { CucurbitaceasPage } from './pages/main/pagina1/cucurbitaceas/cucurbitaceas.page';
import { CruciferasPage } from './pages/main/pagina1/cruciferas/cruciferas.page';
import { ApiaceaePage } from './pages/main/pagina1/apiaceae/apiaceae.page';
import { AmarylidaceasPage } from './pages/main/pagina1/amarylidaceas/amarylidaceas.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule), canActivate:[NoAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },


  { path: 'detalles-solanaceas', component: solanaceasPage },
  { path: 'detalles-cucurbitaceas', component: CucurbitaceasPage },
  { path: 'detalles-cruciferas', component: CruciferasPage },
  { path: 'detalles-apiaceae', component: ApiaceaePage },
  { path: 'detalles-amarylidaceas', component: AmarylidaceasPage }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
