import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateAmarylidaceasComponent } from './components/add-update-amarylidaceas/add-update-amarylidaceas.component';
import { AmarylidaceasDetailComponent } from './components/amarylidaceas-detail/amarylidaceas-detail.component';
import { AddUpdateApiaceaeComponent } from './components/add-update-apiaceae/add-update-apiaceae.component';
import { ApiaceaeDetailComponent } from './components/apiaceae-detail/apiaceae-detail.component';
import { CruciferasDetailComponent } from './components/cruciferas-detail/cruciferas-detail.component';
import { AddUpdateCruciferasComponent } from './components/add-update-cruciferas/add-update-cruciferas.component';
import { AddUpdateCucurbitaceasComponent } from './components/add-update-cucurbitaceas/add-update-cucurbitaceas.component';
import { CurcubitaceasDetailComponent } from './components/curcubitaceas-detail/curcubitaceas-detail.component';
import { solanaceasDetailComponent } from './components/solanaceas-detail/solanaceas-detail.component.spec';
import { AddUpdatesolanaceasComponent } from './components/add-update-solanaceas/add-update-solanaceas.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateAmarylidaceasComponent,
    AmarylidaceasDetailComponent,
    AddUpdateApiaceaeComponent,
    ApiaceaeDetailComponent,
    CruciferasDetailComponent,
    AddUpdateCruciferasComponent,
    AddUpdateCucurbitaceasComponent,
    CurcubitaceasDetailComponent,
    solanaceasDetailComponent,
    AddUpdatesolanaceasComponent
    
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    CommonModule,
    AddUpdateAmarylidaceasComponent,
    AmarylidaceasDetailComponent,
    AddUpdateApiaceaeComponent,
    ApiaceaeDetailComponent,
    CruciferasDetailComponent,
    AddUpdateCruciferasComponent,
    AddUpdateCucurbitaceasComponent,
    CurcubitaceasDetailComponent,
    solanaceasDetailComponent,
    AddUpdatesolanaceasComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
