import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistActionsComponent } from './wishlist-actions.component';

describe('WishlistActionsComponent', () => {
  let component: WishlistActionsComponent;
  let fixture: ComponentFixture<WishlistActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistActionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
