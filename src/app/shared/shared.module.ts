import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateAmarylidaceasComponent } from './components/add-update-amarylidaceas/add-update-amarylidaceas.component';
import { AmarylidaceasDetailComponent } from './components/amarylidaceas-detail/amarylidaceas-detail.component';
import { AddUpdateCucurbitaceasComponent } from './components/add-update-cucurbitaceas/add-update-cucurbitaceas.component';
import { CurcubitaceasDetailComponent } from './components/curcubitaceas-detail/curcubitaceas-detail.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateAmarylidaceasComponent,
    AmarylidaceasDetailComponent,
    AddUpdateCucurbitaceasComponent,
    CurcubitaceasDetailComponent


    
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    CommonModule,
    AddUpdateAmarylidaceasComponent,
    AmarylidaceasDetailComponent,
    AddUpdateCucurbitaceasComponent,
    CurcubitaceasDetailComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
