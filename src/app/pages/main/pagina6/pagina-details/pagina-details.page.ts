import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import { Plague } from '../../main.module';


@Component({
  selector: 'app-pagina-details',
  templateUrl: './pagina-details.page.html',
  styleUrls: ['./pagina-details.page.scss'],
})
export class PaginaDetailsPage implements OnInit {

  plague: Plague;

  ActivRouter = inject(ActivatedRoute);
  mainService = inject(MainService)



  ngOnInit() {
    this.ActivRouter.paramMap.subscribe(paramMap => {

      const recipeId = paramMap.get('pagina6Id')
      this.plague = this.mainService.getPlague(recipeId);
      console.log(this.plague)
    })
  }

}
