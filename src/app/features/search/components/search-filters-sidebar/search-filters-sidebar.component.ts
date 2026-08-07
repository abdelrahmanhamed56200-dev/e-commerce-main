import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { max, min } from 'rxjs';

@Component({
  selector: 'app-search-filters-sidebar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-filters-sidebar.component.html',
  styleUrl: './search-filters-sidebar.component.css',
})
export class SearchFiltersSidebarComponent {
  // serves
  readonly fb = inject(FormBuilder);

  // data
  brands = input.required<{ id: string; value: string }[]>();
  categories = input.required<{ id: string; value: string }[]>();

  // active inputs
  activeBrandsIds = input<string[]>([]);
  activeCategoriesIds = input<string[]>([]);

  // active filters boolean
  isActiveFilters = input<boolean>(false);

  // active price range
  activePrice = input.required<{ minPrice: string; maxPrice: string }>();

  // on select
  onSelectedBrandsIds = output<string[]>();
  onSelectedCategoriesIds = output<string[]>();
  onSetPriceRenege = output<{ minPrice: string; maxPrice: string }>();

  // on clear
  onClearAllFilters = output<void>();

  // form
  categoriesForm: FormGroup | null = null;
  brandsForm: FormGroup | null = null;

  // price range form
  priceRangeForm = this.fb.group({
    minPrice: this.fb.control(''),
    maxPrice: this.fb.control(''),
  });

  constructor() {
    // set form categories
    effect(() => {
      const cats = this.categories();
      if (cats.length === 0) return;
      if (this.categoriesForm) return;
      this.categoriesForm = this.fb.group(this.setFormControls(cats));
      this.setActiveInput(this.activeCategoriesIds(), this.categoriesForm);
      this.categoriesForm.valueChanges.subscribe(() => {
        this.onSelectedInputs(this.onSelectedCategoriesIds, this.categoriesForm as FormGroup);
      });
    });

    // set active categories
    effect(() => {
      const cats = this.activeCategoriesIds();
      if (!this.categoriesForm) return;
      if (
        this.getSelectedInputIds(this.categoriesForm as FormGroup).every((id) => cats.includes(id))
      )
        return;
      this.setActiveInput(cats, this.categoriesForm);
    });

    // set form brands
    effect(() => {
      const brands = this.brands();
      if (brands.length === 0) return;
      if (this.brandsForm) return;
      this.brandsForm = this.fb.group(this.setFormControls(brands));
      this.setActiveInput(this.activeBrandsIds(), this.brandsForm);
      this.brandsForm.valueChanges.subscribe(() => {
        this.onSelectedInputs(this.onSelectedBrandsIds, this.brandsForm as FormGroup);
      });
    });

    // set active brands
    effect(() => {
      const brands = this.activeBrandsIds();
      if (!this.brandsForm) return;
      if (this.getSelectedInputIds(this.brandsForm as FormGroup).every((id) => brands.includes(id)))
        return;
      this.setActiveInput(this.activeBrandsIds(), this.brandsForm);
    });

    // set price range
    effect(() => {
      const p = this.activePrice();
      if (!this.priceRangeForm) return;

      if (
        this.priceRangeForm.get('minPrice')?.value === p?.minPrice &&
        this.priceRangeForm.get('maxPrice')?.value === p?.maxPrice
      )
        return;
      this.priceRangeForm.get('minPrice')?.setValue(p?.minPrice, { emitEvent: false });
      this.priceRangeForm.get('maxPrice')?.setValue(p?.maxPrice, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.priceRangeForm.valueChanges.subscribe((value) => {
      const minControl = this.priceRangeForm.get('minPrice');
      const maxControl = this.priceRangeForm.get('maxPrice');

      if (!value.minPrice || value.minPrice === '0') {
        minControl?.setValue('', { emitEvent: false });
      }
      if (!value.maxPrice || value.maxPrice === '0') {
        maxControl?.setValue('', { emitEvent: false });
      }

      this.onSetPriceRenege.emit({
        minPrice: value.minPrice ? value.minPrice : '',
        maxPrice: value.maxPrice ? value.maxPrice : '',
      });
    });
  }

  setFormControls(data: { id: string; value: string }[]) {
    const controls: Record<string, FormControl> = {};
    for (let category of data) {
      controls[category.id] = this.fb.control(false);
    }
    return controls;
  }
  setActiveInput(activeInputsIds: string[], form: FormGroup) {
    form?.reset();
    activeInputsIds.forEach((id) => {
      const control = form?.get(id);
      if (control) {
        control.setValue(true);
      }
    });
  }
  getSelectedInputIds(form: FormGroup): string[] {
    let id: string[] = [];
    for (let [key, value] of Object.entries(form?.value)) {
      if (value === true) {
        id.push(key);
      }
    }
    return id;
  }
  onSelectedInputs(output: OutputEmitterRef<string[]>, form: FormGroup) {
    output.emit(this.getSelectedInputIds(form));
  }
  clearAllFilters() {
    this.onClearAllFilters.emit();
  }

  setPriceRene(value: string) {
    this.priceRangeForm.get('maxPrice')?.setValue(value);
  }
}
