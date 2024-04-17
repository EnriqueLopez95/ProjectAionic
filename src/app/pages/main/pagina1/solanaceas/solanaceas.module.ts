import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolanaceasPageRoutingModule } from './solanaceas-routing.module';

import { SolanaceasPage } from './solanaceas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolanaceasPageRoutingModule,
    SharedModule
  ],
  declarations: [SolanaceasPage]
})
export class SolanaceasPageModule {}
