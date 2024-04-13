import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaDetailsPageRoutingModule } from './pagina-details-routing.module';

import { PaginaDetailsPage } from './pagina-details.page';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [PaginaDetailsPage],
  
})
export class PaginaDetailsPageModule {}
