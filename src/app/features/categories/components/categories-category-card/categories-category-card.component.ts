import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../../../core/models/all-categories.interface';

@Component({
  selector: 'app-categories-category-card',
  imports: [RouterLink],
  templateUrl: './categories-category-card.component.html',
  styleUrl: './categories-category-card.component.css',
})
export class CategoriesCategoryCardComponent {
  category = input.required<ICategory>();
}
