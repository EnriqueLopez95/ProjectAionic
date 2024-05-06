import { Component } from '@angular/core';
import {Swiper} from 'swiper';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  mostrarInformacion: boolean = false;

}
