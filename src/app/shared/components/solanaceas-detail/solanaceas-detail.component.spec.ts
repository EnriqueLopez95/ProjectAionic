import { Component, Input, OnInit } from '@angular/core';
import { solanaceasM } from 'src/app/models/solanaceas.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-solanaceas-detail',
  templateUrl: './solanaceas-detail.component.html',
  styleUrls: ['./solanaceas-detail.component.scss'],
})
export class solanaceasDetailComponent implements OnInit {
  @Input() aid: string;
  cultivo: solanaceasM;

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    if (this.aid) {
      this.getCultivo(this.aid);
    }
  }

  getCultivo(aid: string) {
    let path = `/solanaceas/${aid}`;
    this.firebaseSvc.getDocument(path).then((res: any) => {
      this.cultivo = res;
    }).catch(error => {
      console.error('Error al obtener el cultivo:', error);
    });
  }
}
