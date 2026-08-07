import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsBrandCardComponent } from './brands-brand-card.component';

describe('BrandsBrandCardComponent', () => {
  let component: BrandsBrandCardComponent;
  let fixture: ComponentFixture<BrandsBrandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsBrandCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsBrandCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
