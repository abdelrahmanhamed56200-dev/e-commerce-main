import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCategoryCardComponent } from '../home-category-card/home-category-card.component';
import { HomeSectionTitleComponent } from '../home-section-title/home-section-title.component';
import { ICategory } from '../../../../core/models/all-categories.interface';

@Component({
  selector: 'app-home-category-section',
  imports: [HomeSectionTitleComponent, RouterLink, HomeCategoryCardComponent],
  templateUrl: './home-category-section.component.html',
  styleUrl: './home-category-section.component.css',
})
export class HomeCategorySectionComponent {
  categories = input.required<ICategory[]>();

  duration = signal(0.4);

  getDuration() {
    return this.duration.update((value) => value + 0.1);
  }
}
