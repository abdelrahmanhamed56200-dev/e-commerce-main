import { Component, computed, inject, Renderer2, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { ICategory, IAllCategoriesResponse } from '../../../core/models/all-categories.interface';
import { CategoriesApiService } from '../../../core/services/categories/categories-api.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly authService = inject(AuthService);

  isLogged = computed(() => this.authService.isLogged());
  categories = signal<ICategory[] | null>(null);
  isDrawerOpen = signal(false);

  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.categoriesApiService.getAllCategories().subscribe({
      next: (res: IAllCategoriesResponse) => {
        const allowedSlugs = [
          'electronics',
          "women's-fashion",
          "men's-fashion",
          'beauty-and-health',
        ];
        this.categories.set(res.data.filter((category) => allowedSlugs.includes(category.slug)));
      },
    });
  }
}
