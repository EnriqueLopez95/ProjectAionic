import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  constructor(private navCtrl: NavController) {}

  navegarAFamilia(familia: string) {
    // Aquí puedes definir la ruta a la página de detalles de la familia
    // Por ejemplo:
    this.navCtrl.navigateForward(`/detalles-familia/${familia}`);
  }
  ngOnInit() {
  }

}
