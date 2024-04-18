import { Component, inject, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isAuth: boolean = false; // Recibe el valor de isAuth desde el componente padre

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;

  utilsSvc = inject(UtilsService)

  showSearch: boolean = false;

  constructor() {}
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  dismissModal(){
    this.utilsSvc.dismissModal();
  }


}
