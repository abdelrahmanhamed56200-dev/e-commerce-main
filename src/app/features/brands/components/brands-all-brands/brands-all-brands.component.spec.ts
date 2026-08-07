import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsAllBrandsComponent } from './brands-all-brands.component';

describe('BrandsAllBrandsComponent', () => {
  let component: BrandsAllBrandsComponent;
  let fixture: ComponentFixture<BrandsAllBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsAllBrandsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsAllBrandsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
