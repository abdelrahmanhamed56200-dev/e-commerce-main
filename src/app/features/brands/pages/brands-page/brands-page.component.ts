import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsAllBrandsComponent } from '../../components/brands-all-brands/brands-all-brands.component';
import { IBrand, IBrandsResponse } from '../../../../core/models/brands.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { BrandsSkeletonBrandCardComponent } from '../../components/brands-skeleton-brand-card/brands-skeleton-brand-card.component';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { BrandsApiService } from '../../../../core/services/brands/brands-api.service';

@Component({
  selector: 'app-brands-page',
  imports: [
    BrandsAllBrandsComponent,
    NgxPaginationModule,

    BrandsSkeletonBrandCardComponent,
    NotFoundProducesComponent,
    BreadcrumbsCardComponent,
  ],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent implements OnInit {
  private readonly brandsApiService = inject(BrandsApiService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  brands = signal<IBrand[]>([]);
  isLoading = signal(false);

  page = signal(1);
  limit = signal(36);
  totalBrands = signal(0);

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['page']) {
        this.page.set(+params['page']);
      }
    });
  }
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.brands.set([]);

    this.brandsApiService.getAllBrands({ page: this.page(), limit: this.limit() }).subscribe({
      next: (res: IBrandsResponse) => {
        this.brands.set(res.data);
        this.totalBrands.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
  changePage(page: number) {
    this.brands.set([]);
    this.page.set(page);
    this.getAllBrands();
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    this.router.navigate([], {
      queryParams: { page: this.page() },
    });
  }
}
