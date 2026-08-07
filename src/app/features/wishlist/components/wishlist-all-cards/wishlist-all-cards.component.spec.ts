import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistAllCardsComponent } from './wishlist-all-cards.component';

describe('WishlistAllCardsComponent', () => {
  let component: WishlistAllCardsComponent;
  let fixture: ComponentFixture<WishlistAllCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistAllCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistAllCardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
