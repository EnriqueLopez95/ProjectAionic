import { Component, OnInit, inject } from '@angular/core';
import { MainService } from '../main.service';


@Component({
  selector: 'app-pagina6',
  templateUrl: './pagina6.page.html',
  styleUrls: ['./pagina6.page.scss'],
})
export class Pagina6Page implements OnInit {

  plague = []

  mainSvc = inject (MainService)

  
  ngOnInit() {
    this.plague = this.mainSvc.getPlagues()

  }

}
