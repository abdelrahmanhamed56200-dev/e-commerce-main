import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IAllCategoriesResponse,
  ICategory,
} from '../../../../core/models/all-categories.interface';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { CategoriesAllCategoriesComponent } from '../../components/categories-all-categories/categories-all-categories.component';
import { CategoriesSkeletonCategoryCardComponent } from '../../components/categories-skeleton-category-card/categories-skeleton-category-card.component';
import { CategoriesApiService } from '../../../../core/services/categories/categories-api.service';

@Component({
  selector: 'app-categories-page',
  imports: [
    CategoriesAllCategoriesComponent,
    BreadcrumbsCardComponent,
    CategoriesSkeletonCategoryCardComponent,
    NotFoundProducesComponent,
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly categoriesApiService = inject(CategoriesApiService);

  allCategories = signal<ICategory[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.allCategories.set([]);

    this.categoriesApiService.getAllCategories().subscribe({
      next: (res: IAllCategoriesResponse) => {
        this.allCategories.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onClearFilters() {
    this.router.navigate(['/products']);
  }
}
