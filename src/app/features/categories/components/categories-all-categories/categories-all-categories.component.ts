import { Component, input } from '@angular/core';
import { CategoriesCategoryCardComponent } from '../categories-category-card/categories-category-card.component';
import { ICategory } from '../../../../core/models/all-categories.interface';

@Component({
  selector: 'app-categories-all-categories',
  imports: [CategoriesCategoryCardComponent],
  templateUrl: './categories-all-categories.component.html',
  styleUrl: './categories-all-categories.component.css',
})
export class CategoriesAllCategoriesComponent {
  categories = input.required<ICategory[]>();
}
