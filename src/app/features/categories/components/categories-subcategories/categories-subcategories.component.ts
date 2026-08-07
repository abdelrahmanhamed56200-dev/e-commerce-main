import { Component, input } from '@angular/core';
import { ISubcategory } from '../../../../core/models/subcategory.interface';
import { BackLinkComponent } from '../../../../shared/ui/back-link/back-link.component';
import { CategoriesSubcategoryCardComponent } from '../categories-subcategory-card/categories-subcategory-card.component';
import { CategoriesSkeletonSubcategoryCardComponent } from '../categories-skeleton-subcategory-card/categories-skeleton-subcategory-card.component';

@Component({
  selector: 'app-categories-subcategories',
  imports: [
    BackLinkComponent,
    CategoriesSubcategoryCardComponent,
    CategoriesSkeletonSubcategoryCardComponent,
  ],
  templateUrl: './categories-subcategories.component.html',
  styleUrl: './categories-subcategories.component.css',
})
export class CategoriesSubcategoriesComponent {
  categoryName = input.required<string>();
  subcategories = input.required<ISubcategory[]>();
  isLoading = input.required<boolean>();
}
