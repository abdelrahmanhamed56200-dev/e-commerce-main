import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../../core/models/all-categories.interface';

import {
  ISubcategoriesResponse,
  ISubcategory,
} from '../../../../core/models/subcategory.interface';
import { CategoriesSubcategoriesComponent } from '../../components/categories-subcategories/categories-subcategories.component';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { SubcategoriesApiService } from '../../../../core/services/subcategories/subcategories-api.service';
import { CategoriesApiService } from '../../../../core/services/categories/categories-api.service';

@Component({
  selector: 'app-subcategories-page',
  imports: [CategoriesSubcategoriesComponent, BreadcrumbsCardComponent],
  templateUrl: './subcategories-page.component.html',
  styleUrl: './subcategories-page.component.css',
})
export class SubcategoriesPageComponent {
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly subcategoriesApiService = inject(SubcategoriesApiService);
  private readonly activatedRoute = inject(ActivatedRoute);

  isLoading = signal(true);
  isLoadingSubcategories = signal(true);
  categoryId = signal('');
  category = signal<ICategory>({} as ICategory);
  subcategories = signal<ISubcategory[]>([]);

  constructor() {
    this.activatedRoute.params.subscribe((p) => {
      this.categoryId.set(p['categoryId']);
      this.getSpecificCategory();
      this.getSubCategoriesOnCategory();
    });
  }
  getSpecificCategory(): void {
    this.categoriesApiService.getSpecificCategory(this.categoryId()).subscribe({
      next: (res) => {
        this.category.set(res.data);
        this.isLoading.set(false);
      },
    });
  }

  getSubCategoriesOnCategory(): void {
    this.subcategoriesApiService.getAllSubCategoriesOnCategory(this.categoryId()).subscribe({
      next: (res: ISubcategoriesResponse) => {
        this.subcategories.set(res.data);
        this.isLoadingSubcategories.set(false);
      },
    });
  }
}
