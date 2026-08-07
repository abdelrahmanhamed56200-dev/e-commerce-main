import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-home-features-bar',
  imports: [],
  templateUrl: './home-features-bar.component.html',
  styleUrl: './home-features-bar.component.css',
})
export class HomeFeaturesBarComponent implements AfterViewInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  section = viewChild<ElementRef>('section');
  carts = viewChildren<ElementRef>('carts');

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
          if (entries.length >= 0 && entries[0].isIntersecting) {
            this.carts().forEach((el) => {
              el.nativeElement.classList.add('show');
            });
          }
          observer.unobserve(this.section()?.nativeElement);
        },
        { threshold: 0.5 },
      );

      observer.observe(this.section()?.nativeElement);
    }
  }
}
