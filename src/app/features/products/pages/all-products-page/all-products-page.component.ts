import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { IActiveFilters } from '../../../../core/models/active-filters.interface';
import { IProduct, IProductResponse } from '../../../../core/models/product.interface';
import { BrandsApiService } from '../../../../core/services/brands/brands-api.service';
import { CategoriesApiService } from '../../../../core/services/categories/categories-api.service';
import { ProductsApiService } from '../../../../core/services/products/products-api.service';
import { SubcategoriesApiService } from '../../../../core/services/subcategories/subcategories-api.service';
import { ActiveFiltersComponent } from '../../../../shared/ui/active-filters/active-filters.component';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { LoadingProductsComponent } from '../../../../shared/ui/loading-products/loading-products.component';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { ProductsAllProductsComponent } from '../../components/products-all-products/products-all-products.component';

@Component({
  selector: 'app-all-products-page',
  imports: [
    NgxPaginationModule,
    LoadingProductsComponent,
    ProductsAllProductsComponent,
    NotFoundProducesComponent,
    ActiveFiltersComponent,
    BreadcrumbsCardComponent,
  ],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css',
})
export class AllProductsPageComponent implements OnInit {
  private readonly productsApiService = inject(ProductsApiService);
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly subcategoriesApiService = inject(SubcategoriesApiService);
  private readonly brandsApiService = inject(BrandsApiService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // crumbs
  crumbPaths = signal<{ label: string; link: string }[]>([]);
  crumb_icon_img = signal<{ type: 'icon' | 'img'; value: string }>({
    type: 'icon',
    value: 'fa-solid fa-box-open',
  });
  crumbTitle = signal('All Products');
  crumbText = signal('Explore our complete product collection');
  crumbPageTitle = signal('All Products');

  products = signal<IProduct[]>([]);
  isLoading = signal(false);
  totalProducts = signal(0);
  limit = signal(40);

  currentPage = signal(1);
  brandId = signal<null | string>(null);
  subcategoryId = signal<null | string>(null);
  categoryId = signal<null | string>(null);

  activeFilter = signal<IActiveFilters[]>([]);

  ngOnInit(): void {
    this.subRouter();
  }

  // sub Router
  subRouter() {
    this.activatedRoute.queryParams.subscribe((q) => {
      const filter: any[] = [];
      this.clearFilters();

      if (q['brand']) {
        this.brandId.set(q['brand']);
        filter.push({ type: 'brands', value: q['slug'], id: q['brand'] });
      }

      if (q['subcategory']) {
        this.subcategoryId.set(q['subcategory']);
        filter.push({ type: 'subcategory', value: q['slug'], id: q['brand'] });
      }

      if (q['category']) {
        this.categoryId.set(q['category']);
        filter.push({ type: 'categories', value: q['slug'], id: q['brand'] });
      }

      if (q['page']) {
        this.currentPage.set(q['page']);
      } else {
        this.currentPage.set(1);
      }

      this.activeFilter.set(filter);
      this.setCrumbValues();
      this.getProducts();
    });
  }

  // get Data
  getProducts() {
    this.products.set([]);
    if (this.isLoading()) return;
    this.isLoading.set(true);
    let filters: any = { page: this.currentPage(), limit: this.limit() };

    if (this.brandId()) filters['brand'] = [this.brandId()];
    else if (this.categoryId()) filters['category'] = [this.categoryId()];
    else if (this.subcategoryId()) filters['subcategory'] = [this.subcategoryId()];

    this.productsApiService.getAllProducts(filters).subscribe({
      next: (res: IProductResponse) => {
        this.totalProducts.set(res.results);
        this.products.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
  getBrand() {
    this.brandsApiService.getSpecificBrand(this.brandId()!).subscribe({
      next: (res) => {
        this.activeFilter()[0].value = res.data.name;
        this.crumbPaths.set([{ label: 'Brands', link: '/brands' }]);
        this.crumb_icon_img.set({ type: 'img', value: res.data.image });
        this.crumbTitle.set(res.data.name);
        this.crumbText.set(`Shop ${res.data.name} products`);
        this.crumbPageTitle.set(res.data.name);
      },
    });
  }
  getCategory() {
    this.categoriesApiService.getSpecificCategory(this.categoryId()!).subscribe({
      next: (res) => {
        this.activeFilter()[0].value = res.data.name;
        this.crumbPaths.set([
          { label: 'Categories', link: '/categories' },
          { label: res.data.name, link: '/categories/' + res.data._id },
        ]);
        this.crumb_icon_img.set({ type: 'img', value: res.data.image });
        this.crumbTitle.set(res.data.name);
        this.crumbText.set(`Browse products in ${res.data.name}`);
        this.crumbPageTitle.set(res.data.name);
      },
    });
  }
  getSubcategory() {
    this.subcategoriesApiService.getSpecificSubCategory(this.subcategoryId()!).subscribe({
      next: (res) => {
        this.activeFilter()[0].value = res.data.name;
        this.crumbPaths.set([{ label: 'Categories', link: '/categories' }]);
        this.crumb_icon_img.set({ type: 'icon', value: 'fa-solid fa-folder-open' });
        this.crumbTitle.set(res.data.name);
        this.crumbText.set(`Browse  ${res.data.name} products`);
        this.crumbPageTitle.set(res.data.name);
      },
    });
  }
  onPageChanged(page: number) {
    this.currentPage.set(page);
    this.router
      .navigate([], {
        queryParams: { page },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
      });
  }

  onClearFilters() {
    this.clearFilters();
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });
  }
  clearFilters() {
    this.currentPage.set(1);
    this.brandId.set(null);
    this.subcategoryId.set(null);
    this.categoryId.set(null);
    this.activeFilter.set([]);
  }

  onRemoveFilter(filter: IActiveFilters) {
    this.onClearFilters();
  }
  setCrumbValues() {
    if (this.activeFilter().length > 0) {
      if (this.activeFilter()[0].type === 'brands') {
        this.getBrand();
        return;
      }
      if (this.activeFilter()[0].type === 'subcategory') {
        this.getSubcategory();
        return;
      }
      if (this.activeFilter()[0].type === 'categories') {
        this.getCategory();
        return;
      }
    }
    this.crumbPaths.set([]);
    this.crumb_icon_img.set({ type: 'icon', value: 'fa-solid fa-box-open' });
    this.crumbTitle.set('All Products');
    this.crumbText.set('Explore our complete product collection');
    this.crumbPageTitle.set('All Products');
  }
}
