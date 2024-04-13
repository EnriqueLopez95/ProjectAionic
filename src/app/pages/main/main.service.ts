import { Injectable, inject } from '@angular/core';
import { MainPageModule, Plague } from './main.module';

@Injectable({
  providedIn: 'root'
})
export class MainService {

private plague: Plague[]  = [{
    id:'1',
    title: 'Polilla del tomate',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Tuta_absoluta_5432149.jpg',
    comments: ['Esta plaga afecta especialmente a los cultivos de tomate, causando daños en los frutos y reduciendo la producción.']

  },
  {
    id:'2',
    title: 'Pulgon',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Aphididae_%28aka%29.jpg',
    comments: []
  },
  
  ]

  constructor() { }


  getPlagues(){

    return [...this.plague]
  }

  getPlague(plagueId: string){

    return {
      ...this.plague.find(plague => {
        return plague.id === plagueId
      })
    }

  }



}
