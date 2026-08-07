import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  Renderer2,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-promo-banner-cards-section',
  imports: [RouterLink],
  templateUrl: './home-promo-banner-cards-section.component.html',
  styleUrl: './home-promo-banner-cards-section.component.css',
})
export class HomePromoBannerCardsSectionComponent implements AfterViewInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  cart1 = viewChild<ElementRef>('cart1');
  cart2 = viewChild<ElementRef>('cart2');

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target == this.cart1()?.nativeElement) {
              entry.target.classList.add('animate-[fadeRight_1s_ease-in-out_0.2s_forwards]');
              observer.unobserve(this.cart1()?.nativeElement);
            }
            if (entry.isIntersecting && entry.target === this.cart2()?.nativeElement) {
              entry.target.classList.add('animate-[fadeLeft_1s_ease-in-out_0.2s_forwards]');
              observer.unobserve(this.cart2()?.nativeElement);
            }
          });
        },
        { threshold: 0.6 },
      );

      observer.observe(this.cart1()?.nativeElement);
      observer.observe(this.cart2()?.nativeElement);
    }
  }
}
