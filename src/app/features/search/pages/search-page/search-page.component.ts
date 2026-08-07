import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAllCategoriesResponse } from '../../../../core/models/all-categories.interface';
import { IProduct, IProductResponse } from '../../../../core/models/product.interface';
import { IBrandsResponse } from '../../../../core/models/brands.interface';
import { SearchFiltersDrawerComponent } from '../../components/search-filters-drawer/search-filters-drawer.component';
import { SearchFiltersSidebarComponent } from '../../components/search-filters-sidebar/search-filters-sidebar.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { SearchProductsGridViewComponent } from '../../components/search-products-grid-view/search-products-grid-view.component';
import { SearchSortbyGridViewComponent } from '../../components/search-sortby-grid-view/search-sortby-grid-view.component';
import { IDisplayType, ISort } from '../../interfaces/search-types';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { LoadingProductsComponent } from '../../../../shared/ui/loading-products/loading-products.component';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { ActiveFiltersComponent } from '../../../../shared/ui/active-filters/active-filters.component';
import { IActiveFilters } from '../../../../core/models/active-filters.interface';
import { ProductsApiService } from '../../../../core/services/products/products-api.service';
import { BrandsApiService } from '../../../../core/services/brands/brands-api.service';
import { CategoriesApiService } from '../../../../core/services/categories/categories-api.service';

@Component({
  selector: 'app-search-page',
  imports: [
    SearchInputComponent,
    SearchSortbyGridViewComponent,
    SearchFiltersSidebarComponent,
    SearchFiltersDrawerComponent,
    SearchProductsGridViewComponent,
    LoadingProductsComponent,
    NotFoundProducesComponent,
    ActiveFiltersComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly brandsApiService = inject(BrandsApiService);
  private readonly productsApiService = inject(ProductsApiService);
  private readonly localStorageService = inject(LocalStorageService);

  protectedSub = new Subscription();

  // data
  brands = signal<{ id: string; value: string }[]>([]);
  categories = signal<{ id: string; value: string }[]>([]);

  // state
  sortBy = signal<ISort>('relevance');
  searchTerm = signal('');

  // filters
  minPrice = signal('');
  maxPrice = signal('');
  selectedCategoryIds = signal<string[]>([]);
  selectedBrandIds = signal<string[]>([]);
  selectedBrands = signal<{ id: string; value: string }[]>([]);
  selectedCategories = signal<{ id: string; value: string }[]>([]);

  // UI
  displayMode = signal<IDisplayType>('grid');
  isLoading = signal(false);
  products = signal<IProduct[]>([]);
  activeFilters = signal<IActiveFilters[]>([]);

  // utils
  private searchTimeout!: ReturnType<typeof setTimeout>;

  // flags
  private isUpdatingFromQuery = signal(false);
  isOpenFiltersDrawer = signal(false);

  // pagination
  currentPage = signal(1);
  limit = signal(12);
  totalProducts = signal(0);

  ngOnInit(): void {
    // get data
    this.getBrands();
    this.getCategories();
    this.onCloseFiltersDrawer();
    //
    this.onSetDisplayGrid(this.localStorageService.getSearchDisplayMode());

    // set all filters queryParams
    this.activatedRoute.queryParams.subscribe((q) => {
      if (this.isUpdatingFromQuery()) return;

      this.currentPage.set(q['page'] ? q['page'] : 1);
      this.searchTerm.set(q['q'] ? q['q'] : '');
      this.sortBy.set(q['sort'] ? q['sort'] : 'relevance');
      this.selectedCategoryIds.set(q['category'] ? [].concat(q['category']) : []);
      this.selectedBrandIds.set(q['brand'] ? [].concat(q['brand']) : []);

      this.minPrice.set(q['minPrice'] ? q['minPrice'] : '');
      this.maxPrice.set(q['maxPrice'] ? q['maxPrice'] : '');

      this.set_selected_categories_brands();
      this.activeFilters.set(this.getActiveFilters());
      this.getProducts();
    });
  }

  // api call
  getCategories() {
    this.categoriesApiService.getAllCategories().subscribe({
      next: (res: IAllCategoriesResponse) => {
        let o: { id: string; value: string }[] = [];
        res.data.forEach((category) => {
          o.push({
            id: category._id,
            value: category.name,
          });
        });
        this.categories.set(o);
      },
    });
  }
  getBrands() {
    this.brandsApiService.getAllBrands({ limit: 15 }).subscribe({
      next: (res: IBrandsResponse) => {
        let o: { id: string; value: string }[] = [];
        res.data.forEach((brand) => {
          o.push({
            id: brand._id,
            value: brand.name,
          });
        });
        this.brands.set(o);
      },
    });
  }
  getProducts() {
    this.products.set([]);
    this.protectedSub.unsubscribe();
    this.isLoading.set(true);
    this.protectedSub = this.productsApiService
      .getAllProducts({
        limit: this.limit(),
        page: this.currentPage(),
        q: this.searchTerm(),
        sort: this.sortBy(),
        category: this.selectedCategoryIds(),
        brand: this.selectedBrandIds(),
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
      })
      .subscribe({
        next: (res: IProductResponse) => {
          this.isLoading.set(false);
          this.products.set([]);
          this.products.set(res.data);
          this.totalProducts.set(res.results);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  // set Query Params
  setAllQueryParams() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.isUpdatingFromQuery.set(true);
      const queryParams = {
        ...(this.currentPage() !== 1 && { page: this.currentPage() }),
        ...(this.searchTerm().trim() && { q: this.searchTerm() }),
        ...(this.sortBy() !== 'relevance' && { sort: this.sortBy() }),
        ...(this.selectedCategoryIds().length > 0 && { category: this.selectedCategoryIds() }),
        ...(this.selectedBrandIds().length > 0 && { brand: this.selectedBrandIds() }),
        ...(this.minPrice() !== '' && this.minPrice() !== '0' && { minPrice: this.minPrice() }),
        ...(this.maxPrice() !== '' && this.maxPrice() !== '0' && { maxPrice: this.maxPrice() }),
      };

      this.router.navigate([], {
        queryParams: queryParams,
        replaceUrl: true,
      });
      this.isUpdatingFromQuery.set(false);
    }, 20);
  }

  set_selected_categories_brands() {
    const selectedCats = this.categories()?.filter((c) => {
      return this.selectedCategoryIds().includes(c.id);
    });
    const selectedBrand = this.brands()?.filter((c) => {
      return this.selectedBrandIds().includes(c.id);
    });

    this.selectedCategories.set(selectedCats);
    this.selectedBrands.set(selectedBrand);
  }

  // get active filters
  getActiveFilters() {
    const filters: IActiveFilters[] = [];

    if (this.searchTerm().trim()) {
      filters.push({ type: 'searchValue', value: this.searchTerm() });
    }

    this.selectedCategories().forEach((category) => {
      filters.push({
        type: 'categories',
        value: category.value,
        id: category.id,
      });
    });

    this.selectedBrands().forEach((brand) => {
      filters.push({ type: 'brands', value: brand.value, id: brand.id });
    });

    const min = Number(this.minPrice());
    const max = Number(this.maxPrice());

    if ((min >= 0 && max > 0) || min > 0) {
      filters.push({ type: 'price', value: `${min} - ${max ? max : '∞'} EGP` });
    }

    return filters;
  }

  // -------------------- events --------------------
  onSortValue(value: ISort) {
    this.sortBy.set(value);
    this.currentPage.set(1);
    this.setAllQueryParams();
  }
  onSearchInput(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
    this.setAllQueryParams();
  }
  onSelectedBrandsIds(selectedBrandsIds: string[]) {
    this.selectedBrandIds.set(selectedBrandsIds);
    this.currentPage.set(1);
    this.setAllQueryParams();
  }
  onSelectedCategoriesIds(selectedCategoryIds: string[]) {
    this.selectedCategoryIds.set(selectedCategoryIds);
    this.currentPage.set(1);
    this.setAllQueryParams();
  }
  onSetPriceRenege(value: { minPrice: string; maxPrice: string }) {
    this.minPrice.set(value.minPrice);
    this.maxPrice.set(value.maxPrice);
    this.currentPage.set(1);
    this.setAllQueryParams();
  }
  onChangPage(page: number) {
    this.currentPage.set(page);
    this.setAllQueryParams();
  }

  // Remove && clear all
  onRemoveFilter(filter: IActiveFilters) {
    if (filter.type === 'categories') {
      this.selectedCategoryIds.set(this.selectedCategoryIds().filter((id) => id !== filter.id));
    }

    if (filter.type === 'brands') {
      this.selectedBrandIds.set(this.selectedBrandIds().filter((id) => id !== filter.id));
    }

    if (filter.type === 'searchValue') {
      this.searchTerm.set('');
    }

    if (filter.type === 'price') {
      this.minPrice.set('');
      this.maxPrice.set('');
    }

    this.currentPage.set(1);

    this.setAllQueryParams();
  }
  onClearAllFilters() {
    this.currentPage.set(1);
    this.sortBy.set('relevance');
    this.searchTerm.set('');
    this.minPrice.set('');
    this.maxPrice.set('');

    this.selectedCategories.set([]);
    this.selectedCategoryIds.set([]);

    this.selectedBrands.set([]);
    this.selectedBrandIds.set([]);
    this.setAllQueryParams();
  }

  // grid display
  onSetDisplayGrid(value: IDisplayType) {
    this.localStorageService.setSearchDisplayMode(value);
    this.displayMode.set(value);
  }

  // open Close filters Drawer
  onOpenFiltersDrawer() {
    this.isOpenFiltersDrawer.set(true);
  }
  @HostListener('window:keydown.escape')
  @HostListener('window:resize')
  onCloseFiltersDrawer() {
    if (isPlatformBrowser(this.pLATFORM_ID)) this.isOpenFiltersDrawer.set(false);
  }
}
