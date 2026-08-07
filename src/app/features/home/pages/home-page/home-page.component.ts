import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IAllCategoriesResponse,
  ICategory,
} from '../../../../core/models/all-categories.interface';
import { IProduct, IProductResponse } from '../../../../core/models/product.interface';
import { HomeCategorySectionComponent } from '../../components/home-category-section/home-category-section.component';
import { HomeFeaturedProductsComponent } from '../../components/home-featured-products/home-featured-products.component';
import { HomeFeaturesBarComponent } from '../../components/home-features-bar/home-features-bar.component';
import { HomeNewsletterSectionComponent } from '../../components/home-newsletter-section/home-newsletter-section.component';
import { HomePromoBannerCardsSectionComponent } from '../../components/home-promo-banner-cards-section/home-promo-banner-cards-section.component';
import { HomeSliderComponent } from '../../components/home-slider/home-slider.component';
import { register } from 'swiper/element/bundle';
import { ProductsApiService } from '../../../../core/services/products/products-api.service';
import { CategoriesApiService } from '../../../../core/services/categories/categories-api.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-home-page',
  imports: [
    HomeFeaturesBarComponent,
    HomeCategorySectionComponent,
    HomePromoBannerCardsSectionComponent,
    HomeNewsletterSectionComponent,
    HomeFeaturedProductsComponent,
    HomeSliderComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private readonly categoriesApiService = inject(CategoriesApiService);
  private readonly productsApiService = inject(ProductsApiService);

  categories = signal<ICategory[]>([]);
  products = signal<IProduct[]>([]);

  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
  }
  getCategories() {
    this.categoriesApiService.getAllCategories().subscribe({
      next: (res: IAllCategoriesResponse) => {
        this.categories.set(res.data);
      },
    });
  }
  getAllProducts() {
    this.productsApiService.getAllProducts().subscribe({
      next: (res: IProductResponse) => {
        this.products.set(res.data);
      },
    });
  }
}
