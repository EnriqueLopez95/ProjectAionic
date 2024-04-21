import { Component, inject, Input, OnInit } from '@angular/core';
import { Curcuvitacias } from 'src/app/models/curcuvitacias.models';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-curcubitaceas-detail',
  templateUrl: './curcubitaceas-detail.component.html',
  styleUrls: ['./curcubitaceas-detail.component.scss'],
})
export class CurcubitaceasDetailComponent implements OnInit {
  @Input() cultivo: Curcuvitacias; // Recibe el cultivo específico

  constructor() {}

  ngOnInit() {}
}