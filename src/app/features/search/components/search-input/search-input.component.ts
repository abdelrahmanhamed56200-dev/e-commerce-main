import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../shared/ui/breadcrumbs/breadcrumbs.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {
  private readonly fb = inject(FormBuilder);

  searchInput: FormControl = this.fb.control('');

  searchValue = input('');
  numberOfProducts = input(0);

  onSearchInput = output<string>();

  isSearch = signal(false);

  constructor() {
    effect(() => {
      const value = this.searchValue() ?? '';
      if (this.searchInput.value !== value) {
        this.searchInput.setValue(value.trim(), { emitEvent: false });
        this.isSearching(value);
      }
    });

    this.searchInput.valueChanges.subscribe((value: string) => {
      this.onSearchInput.emit(value.trim());
      this.isSearching(value);
    });
  }

  isSearching(value: string) {
    if (value.trim() === '') {
      this.isSearch.set(false);
    } else {
      this.isSearch.set(true);
    }
  }
}
