import { Component, input } from '@angular/core';
import { ICategory } from '../../../../core/models/all-categories.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-category-card',
  imports: [RouterLink],
  templateUrl: './home-category-card.component.html',
  styleUrl: './home-category-card.component.css',
})
export class HomeCategoryCardComponent {
  category = input.required<ICategory>();
}
