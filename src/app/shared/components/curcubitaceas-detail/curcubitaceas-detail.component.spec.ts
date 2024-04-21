import { Component, Input, OnInit } from '@angular/core';

import { Curcuvitacias } from 'src/app/models/curcuvitacias.models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-curcubitaceas-detail',
  templateUrl: './curcubitaceas-detail.component.html',
  styleUrls: ['./curcubitaceas-detail.component.scss'],
})
export class CurcubitaceasDetailComponent  implements OnInit {

  @Input() aid: string;
  cultivo: Curcuvitacias;

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    if (this.aid) {
      this.getCultivo(this.aid);
    }
  }

  getCultivo(aid: string) {
    let path = `/Curcubitaceas/${aid}`;
    this.firebaseSvc.getDocument(path).then((res: any) => {
      this.cultivo = res;
    }).catch(error => {
      console.error('Error al obtener el cultivo:', error);
    });
  }

}
