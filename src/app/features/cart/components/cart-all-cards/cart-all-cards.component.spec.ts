import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAllCardsComponent } from './cart-all-cards.component';

describe('CartAllCardsComponent', () => {
  let component: CartAllCardsComponent;
  let fixture: ComponentFixture<CartAllCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAllCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartAllCardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
