import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-products-product-details-swiper',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './products-product-details-swiper.component.html',
  styleUrl: './products-product-details-swiper.component.css',
})
export class ProductsProductDetailsSwiperComponent {
  private readonly platform = inject(PLATFORM_ID);
  imgs = input.required<string[]>();
  productTitle = input.required<string>();

  slidesPerView = computed(() => {
    return this.imgs()?.length > 4 ? 4 : this.imgs()?.length;
  });

  mainSwiper = viewChild<ElementRef>('mainSwiper');
  thumbsSwiper = viewChild<ElementRef>('thumbsSwiper');

  constructor() {
    effect(() => {
      const mainSwiperEl = this.mainSwiper()?.nativeElement;
      const thumbsSwiperEl = this.thumbsSwiper()?.nativeElement;
      if (isPlatformBrowser(this.platform)) {
        if (mainSwiperEl && thumbsSwiperEl) {
          Object.assign(mainSwiperEl, {
            thumbs: {
              swiper: thumbsSwiperEl,
            },
          });

          Object.assign(thumbsSwiperEl, {
            spaceBetween: 5,
            slidesPerView: this.slidesPerView(),
            centeredSlides: true,
            centeredSlidesBounds: true,
            slideToClickedSlide: true,
            freeMode: true,
            watchSlidesProgress: true,
          });

          mainSwiperEl.initialize();
          thumbsSwiperEl.initialize();
        }
      }
    });
  }
}
