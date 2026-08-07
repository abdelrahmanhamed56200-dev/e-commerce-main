import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IDisplayType, ISort } from '../../interfaces/search-types';

@Component({
  selector: 'app-search-sortby-grid-view',
  imports: [ReactiveFormsModule],
  templateUrl: './search-sortby-grid-view.component.html',
  styleUrl: './search-sortby-grid-view.component.css',
})
export class SearchSortbyGridViewComponent {
  private readonly fb = inject(FormBuilder);

  selectInput = this.fb.control('relevance');

  sortValue = input<ISort>('relevance');
  changDisplay = input<IDisplayType>();
  setActiveDisplay = input<IDisplayType>();

  onSortValue = output<ISort>();
  onChangDisplay = output<IDisplayType>();
  onOpenFilters = output<void>();

  display = signal<IDisplayType>('grid');

  constructor() {
    // set sort
    effect(() => {
      if (
        this.sortValue() !== this.selectInput.value &&
        this.sortValue() !== undefined &&
        this.sortValue() !== ('' as ISort)
      ) {
        this.selectInput.setValue(this.sortValue() as ISort, { emitEvent: false });
      }
    });
    effect(() => {
      const d = this.setActiveDisplay();
      this.display.set(d as IDisplayType);
    });

    // set display
    effect(() => {
      if (this.changDisplay() !== this.display() && this.changDisplay() !== undefined) {
        this.display.set(this.changDisplay() as IDisplayType);
      }
    });

    // on Set Sort Value
    this.selectInput.valueChanges.subscribe((value: string | null) => {
      if (value) this.onSortValue.emit(value as ISort);
    });
  }

  setDisplay(value: IDisplayType) {
    this.display.set(value);
    this.onChangDisplay.emit(value);
  }

  openFilters() {
    this.onOpenFilters.emit();
  }
}
