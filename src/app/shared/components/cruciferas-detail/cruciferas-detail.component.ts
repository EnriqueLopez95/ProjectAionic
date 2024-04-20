import { Component, Input, OnInit } from '@angular/core';
import { CruciferasM } from 'src/app/models/cruciferas.model';

@Component({
  selector: 'app-cruciferas-detail',
  templateUrl: './cruciferas-detail.component.html',
  styleUrls: ['./cruciferas-detail.component.scss'],
})
export class CruciferasDetailComponent  implements OnInit {
  @Input() cultivo: CruciferasM; // Recibe el cultivo específico
  constructor() { }

  ngOnInit() {}

}
