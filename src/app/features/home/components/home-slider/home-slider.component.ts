import { isPlatformServer } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  imports: [RouterLink],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeSliderComponent {
  private readonly platform = inject(PLATFORM_ID);

  imgs = [
    '/assets/images/img1.avif',
    '/assets/images/img2.avif',
    '/assets/images/img3.avif',
    '/assets/images/img4.avif',
    '/assets/images/img5.avif',
    '/assets/images/img6.avif',
    '/assets/images/img7.avif',
  ];

  swiperEl = viewChild<ElementRef>('swiperRef');

  ngAfterViewChecked(): void {
    const swiperEl = this.swiperEl()?.nativeElement;

    if (isPlatformServer(this.platform)) return;
    if (!swiperEl) return;
    if (swiperEl.swiper) return;

    const swiperParams = {
      navigation: true,
      pagination: { clickable: true },
      loop: true,
      autoplay: {
        delay: 2000,
      },
    };

    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }
}
