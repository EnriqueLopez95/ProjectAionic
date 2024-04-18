import { Component, inject, Input, OnInit } from '@angular/core';
import { AmarylidaceasM } from 'src/app/models/amarylidaceas.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-amarylidaceas-detail',
  templateUrl: './amarylidaceas-detail.component.html',
  styleUrls: ['./amarylidaceas-detail.component.scss'],
})
export class AmarylidaceasDetailComponent implements OnInit {
  @Input() cultivo: AmarylidaceasM; // Recibe el cultivo específico

  constructor() {}

  ngOnInit() {}
}
