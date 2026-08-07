import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePromoBannerCardsSectionComponent } from './home-promo-banner-cards-section.component';

describe('HomePromoBannerCardsSectionComponent', () => {
  let component: HomePromoBannerCardsSectionComponent;
  let fixture: ComponentFixture<HomePromoBannerCardsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePromoBannerCardsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePromoBannerCardsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
