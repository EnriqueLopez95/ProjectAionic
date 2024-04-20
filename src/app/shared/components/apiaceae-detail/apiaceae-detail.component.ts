import { Component,  Input, OnInit } from '@angular/core';
import { ApiaceaeM } from 'src/app/models/apiaceae.model';

@Component({
  selector: 'app-apiaceae-detail',
  templateUrl: './apiaceae-detail.component.html',
  styleUrls: ['./apiaceae-detail.component.scss'],
})
export class ApiaceaeDetailComponent  implements OnInit {
  @Input() cultivo: ApiaceaeM; // Recibe el cultivo específico


  constructor() { }

  ngOnInit() {}

}
