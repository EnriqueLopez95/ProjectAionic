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
    comments: ['Los pulgones son insectos chupadores de savia que afectan a una amplia variedad de cultivos, como cereales, hortalizas y frutas.']
  },
  {
    id:'3',
    title: 'Mosca de la fruta',
    imageURL: 'https://www.phytoma.com/images/imag2_citriM.jpg',
    comments: ['Esta mosca afecta a frutas como cítricos, manzanas, peras y ciruelas, causando daños en la pulpa de la fruta.']
  },
  {
    id:'4',
    title: 'Escarabajo de la patata',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Colorado_potato_beetle.jpg',
    comments: ['Este escarabajo ataca principalmente a los cultivos de patatas, causando daños en las hojas y disminuyendo la calidad del tubérculo.']
  },
  {
    id:'5',
    title: 'Gusano de alambre',
    imageURL: 'https://content.peat-cloud.com/w400/wireworms-1.jpg',
    comments: ['Estos gusanos son larvas de escarabajos que se alimentan de las raíces de diversos cultivos, causando daños significativos.']
  },
  {
    id:'6',
    title: 'Mildiu',
    imageURL: 'https://cdn0.ecologiaverde.com/es/posts/6/9/3/como_combatir_el_mildiu_2396_orig.jpg',
    comments: ['Es un hongo que afecta a diversas plantas, como la vid y el tomate, provocando manchas en las hojas y afectando el rendimiento.']
  },
  {
    id:'7',
    title: 'Oídio',
    imageURL: 'https://agrotrapiche.com/wp-content/uploads/2018/12/remedios-oidio-plantas.jpg',
    comments: ['Este hongo afecta a diversas plantas, como la vid y las cucurbitáceas, causando un polvo blanco en las hojas y afectando el desarrollo de la planta.']
  },
  {
    id:'8',
    title: 'Trips',
    imageURL: 'https://optigarden.es/wp-content/uploads/2023/01/el-mejor-insecticida-para-trips.jpg',
    comments: ['Estos pequeños insectos se alimentan de los tejidos de las plantas y pueden afectar a una amplia gama de cultivos, como frutas, hortalizas y flores.']
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
