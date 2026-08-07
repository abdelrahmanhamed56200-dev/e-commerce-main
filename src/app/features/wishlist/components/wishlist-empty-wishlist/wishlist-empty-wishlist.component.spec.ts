import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistEmptyWishlistComponent } from './wishlist-empty-wishlist.component';

describe('WishlistEmptyWishlistComponent', () => {
  let component: WishlistEmptyWishlistComponent;
  let fixture: ComponentFixture<WishlistEmptyWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistEmptyWishlistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistEmptyWishlistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
