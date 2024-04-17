import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CucurbitaceasPageRoutingModule } from './cucurbitaceas-routing.module';

import { CucurbitaceasPage } from './cucurbitaceas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CucurbitaceasPageRoutingModule,
    SharedModule
  ],
  declarations: [CucurbitaceasPage]
})
export class CucurbitaceasPageModule {}
