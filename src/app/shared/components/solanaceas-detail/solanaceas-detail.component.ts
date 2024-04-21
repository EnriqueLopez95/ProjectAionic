import { Component, inject, Input, OnInit } from '@angular/core';
import { solanaceasM } from 'src/app/models/solanaceas.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-solanaceas-detail',
  templateUrl: './solanaceas-detail.component.html',
  styleUrls: ['./solanaceas-detail.component.scss'],
})
export class solanaceasDetailComponent implements OnInit {
  @Input() cultivo: solanaceasM; // Recibe el cultivo específico

  constructor() {}

  ngOnInit() {}
}
