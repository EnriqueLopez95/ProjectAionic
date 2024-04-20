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



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateAmarylidaceasComponent,
    AmarylidaceasDetailComponent,
    AddUpdateApiaceaeComponent,
    ApiaceaeDetailComponent
    
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
    ApiaceaeDetailComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
