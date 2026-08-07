import { Component, HostBinding, input, output } from '@angular/core';
import { SearchFiltersSidebarComponent } from '../search-filters-sidebar/search-filters-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filters-drawer',
  imports: [ReactiveFormsModule],
  templateUrl: './search-filters-drawer.component.html',
  styleUrl: './search-filters-drawer.component.css',
})
export class SearchFiltersDrawerComponent extends SearchFiltersSidebarComponent {
  isOpen = input<boolean>(false);
  onCloseFiltersDrawer = output();

  closeFiltersDrawer() {
    this.onCloseFiltersDrawer.emit();
  }
}
