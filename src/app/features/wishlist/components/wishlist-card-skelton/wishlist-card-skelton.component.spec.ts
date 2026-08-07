import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCardSkeltonComponent } from './wishlist-card-skelton.component';

describe('WishlistCardSkeltonComponent', () => {
  let component: WishlistCardSkeltonComponent;
  let fixture: ComponentFixture<WishlistCardSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistCardSkeltonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistCardSkeltonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
