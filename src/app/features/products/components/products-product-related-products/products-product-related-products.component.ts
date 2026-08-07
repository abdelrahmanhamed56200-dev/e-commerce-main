import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { IProduct } from '../../../../core/models/product.interface';
import { ProductCardComponent } from '../../../../shared/ui/product-card/product-card.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products-product-related-products',
  imports: [ProductCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './products-product-related-products.component.html',
  styleUrl: './products-product-related-products.component.css',
})
export class ProductsProductRelatedProductsComponent {
  private readonly platform = inject(PLATFORM_ID);
  products = input.required<IProduct[]>();

  prevRef = viewChild<ElementRef>('prevBtn');
  nextRef = viewChild<ElementRef>('nextBtn');
  swiperRef = viewChild<ElementRef>('swiper');

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platform) && this.products().length > 0) {
        const prevEl = this.prevRef()?.nativeElement;
        const nextEl = this.nextRef()?.nativeElement;
        const swiperEl = this.swiperRef()?.nativeElement;
        if (prevEl && nextEl && swiperEl) {
          Object.assign(swiperEl, {
            navigation: {
              nextEl: nextEl,
              prevEl: prevEl,
            },
            spaceBetween: 20,
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            },

            on: {
              breakpoint(swiper: any) {
                swiper.slideTo(0);
              },
            },
          });
          swiperEl.initialize();
        }
      }
    });
  }
}
