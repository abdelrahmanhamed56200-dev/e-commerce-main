import { Component, effect, input, output, signal } from '@angular/core';
import { IActiveFilters } from '../../../core/models/active-filters.interface';

@Component({
  selector: 'app-active-filters',
  imports: [],
  templateUrl: './active-filters.component.html',
  styleUrl: './active-filters.component.css',
})
export class ActiveFiltersComponent {
  filters = input.required<IActiveFilters[]>();

  onClearFilters = output();
  onRemoveFilter = output<IActiveFilters>();

  isShow = signal(false);
  isShowSearch = signal(false);

  constructor() {
    effect(() => {
      if (this.filters().length > 0) {
        this.isShow.set(true);
      } else {
        this.isShow.set(false);
      }
    });
  }

  filterClass = {
    searchValue: 'bg-gray-100 text-gray-700',
    categories: 'bg-green-100 text-green-700',
    subcategory: 'bg-green-100 text-green-700',
    brands: 'bg-indigo-100 text-indigo-700',
    price: 'bg-amber-100 text-amber-700',
  };

  removeFilter(filter: IActiveFilters) {
    this.onRemoveFilter.emit(filter);
  }
  clearFilters() {
    this.onClearFilters.emit();
  }
}
