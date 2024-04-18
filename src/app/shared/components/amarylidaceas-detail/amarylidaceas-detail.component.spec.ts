import { Component, Input, OnInit } from '@angular/core';
import { AmarylidaceasM } from 'src/app/models/amarylidaceas.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-amarylidaceas-detail',
  templateUrl: './amarylidaceas-detail.component.html',
  styleUrls: ['./amarylidaceas-detail.component.scss'],
})
export class AmarylidaceasDetailComponent implements OnInit {
  @Input() aid: string;
  cultivo: AmarylidaceasM;

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    if (this.aid) {
      this.getCultivo(this.aid);
    }
  }

  getCultivo(aid: string) {
    let path = `/Amarylidáceas/${aid}`;
    this.firebaseSvc.getDocument(path).then((res: any) => {
      this.cultivo = res;
    }).catch(error => {
      console.error('Error al obtener el cultivo:', error);
    });
  }
}
