import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiaceaePageRoutingModule } from './apiaceae-routing.module';

import { ApiaceaePage } from './apiaceae.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiaceaePageRoutingModule,
    SharedModule
  ],
  declarations: [ApiaceaePage]
})
export class ApiaceaePageModule {}
