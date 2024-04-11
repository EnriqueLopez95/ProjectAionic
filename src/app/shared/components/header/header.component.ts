import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;

  showSearch: boolean = false;
  terminoBusqueda: string = '';

  constructor() {}
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  buscar() {
    // Lógica de búsqueda
    console.log('Término de búsqueda:', this.terminoBusqueda);
    // Aquí puedes implementar la lógica de búsqueda real

    // Después de realizar la búsqueda, puedes cerrar el espacio para escribir
    this.showSearch = false;
  }


}
