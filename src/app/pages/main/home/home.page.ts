import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  mostrarInformacion: boolean = false;

  images = [
    '/assets/ImageCarrusel/image5.png',
    '/assets/ImageCarrusel/image8.jpg',
    '/assets/ImageCarrusel/image7.png',
    '/assets/ImageCarrusel/image9.jpg'
  ]

  firebaseSvc= inject(FirebaseService);
  utilsSvc= inject(UtilsService)

  ngOnInit() {
  }

  swiperReady(){
    if(this.swiperRef){
      this.swiper = new Swiper(this.swiperRef.nativeElement, {
        // opciones de configuración de Swiper
      });
    }
  }
  

  goNext(){
    this.swiper?.slideNext
  }

  goPrev(){
    this.swiper?.slidePrev
  }

  swiperSlideChanged(e: any){
    console.log('changed:',e);
  }



  signOut(){
    this.firebaseSvc.signOut();
  }
}
