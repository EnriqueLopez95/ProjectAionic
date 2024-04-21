import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { solanaceasPageRoutingModule } from './solanaceas-routing.module';

import { solanaceasPage } from './solanaceas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    solanaceasPageRoutingModule,
    SharedModule
  ],
  declarations: [solanaceasPage]
})
export class SolanaceasPageModule {}
