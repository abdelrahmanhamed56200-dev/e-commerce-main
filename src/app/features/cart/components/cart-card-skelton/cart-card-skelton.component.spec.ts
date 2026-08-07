import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCardSkeltonComponent } from './cart-card-skelton.component';

describe('CartCardSkeltonComponent', () => {
  let component: CartCardSkeltonComponent;
  let fixture: ComponentFixture<CartCardSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCardSkeltonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartCardSkeltonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
