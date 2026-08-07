import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsletterSectionComponent } from './home-newsletter-section.component';

describe('HomeNewsletterSectionComponent', () => {
  let component: HomeNewsletterSectionComponent;
  let fixture: ComponentFixture<HomeNewsletterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewsletterSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNewsletterSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
