import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { BreadcrumbsComponent } from '../../../../shared/ui/breadcrumbs/breadcrumbs.component';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { ProductsProductDetailsInfoSkeletonComponent } from '../../components/products-product-details-info-skeleton/products-product-details-info-skeleton.component';
import { ProductsProductDetailsSwiperComponent } from '../../components/products-product-details-swiper/products-product-details-swiper.component';
import { ProductsProductImageSwiperSkeletonComponent } from '../../components/products-product-image-swiper-skeleton/products-product-image-swiper-skeleton.component';
import { ProductsProductInfoComponent } from '../../components/products-product-info/products-product-info.component';
import { ProductsProductNaveAndTapsComponent } from '../../components/products-product-nave-and-taps/products-product-nave-and-taps.component';
import {
  IProductDetails,
  IProductDetailsResponse,
} from '../../interfaces/product-details-response.interface';
import { ProductsProductRelatedProductsComponent } from '../../components/products-product-related-products/products-product-related-products.component';
import { IProduct, IProductResponse } from '../../../../core/models/product.interface';
import { ProductsApiService } from '../../../../core/services/products/products-api.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-product-details-page',
  imports: [
    BreadcrumbsComponent,
    ProductsProductDetailsSwiperComponent,
    ProductsProductInfoComponent,
    ProductsProductNaveAndTapsComponent,
    ProductsProductImageSwiperSkeletonComponent,
    ProductsProductDetailsInfoSkeletonComponent,
    NotFoundProducesComponent,
    ProductsProductRelatedProductsComponent,
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsApiService = inject(ProductsApiService);

  isLoading = signal(false);
  isLoadingRelatedProducts = signal(false);
  isLoadingImg = signal(false);
  isEmpty = signal(false);

  productId = signal('');
  breadcrumbsPageTitle = signal('');
  breadcrumbsPaths = signal<{ label: string; link: string; queryParams?: any }[]>([]);
  productDetails = signal<IProductDetails>({} as IProductDetails);
  relatedProducts = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.getRouter();
  }

  getRouter() {
    this.activatedRoute.params.subscribe((q) => {
      this.productId.set(q['id']);
      this.getProductDetails();
    });
  }

  getProductDetails() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isLoadingImg.set(true);
    this.isEmpty.set(false);

    this.productsApiService.getSpecificProduct(this.productId()).subscribe({
      next: (res: IProductDetailsResponse) => {
        this.productDetails.set(res.data);
        this.breadcrumbsPageTitle.set(res.data.title);

        this.breadcrumbsPaths.set([
          { label: res.data.category.name, link: `/categories/${res.data.category._id}` },
          {
            label: res.data.subcategory[0].name,
            link: '/products',
            queryParams: {
              subcategory: res.data.subcategory[0]._id,
              slug: res.data.subcategory[0].slug,
            },
          },
        ]);

        this.isLoading.set(false);
        this.isLoadingImg.set(false);
        this.getRelatedProducts();
      },
      error: () => {
        this.isLoading.set(false);
        this.isEmpty.set(true);
      },
    });
  }

  getRelatedProducts() {
    if (this.isLoadingRelatedProducts()) return;
    this.isLoadingRelatedProducts.set(true);

    this.productsApiService
      .getAllProducts({
        category: [this.productDetails().category._id],
      })
      .subscribe({
        next: (res: IProductResponse) => {
          this.relatedProducts.set(res.data.filter((p) => p._id !== this.productDetails()._id));
          this.isLoadingRelatedProducts.set(false);
        },
        error: () => {
          this.isLoadingRelatedProducts.set(false);
        },
      });
  }
}
