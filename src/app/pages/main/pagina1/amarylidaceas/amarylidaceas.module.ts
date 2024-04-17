import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmarylidaceasPageRoutingModule } from './amarylidaceas-routing.module';

import { AmarylidaceasPage } from './amarylidaceas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmarylidaceasPageRoutingModule,
    SharedModule
  ],
  declarations: [AmarylidaceasPage]
})
export class AmarylidaceasPageModule {}
