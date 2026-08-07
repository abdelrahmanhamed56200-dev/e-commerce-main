import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCardSkeletonComponent } from './address-card-skeleton.component';

describe('AddressCardSkeletonComponent', () => {
  let component: AddressCardSkeletonComponent;
  let fixture: ComponentFixture<AddressCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCardSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressCardSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
