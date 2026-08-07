import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressModalComponent } from './address-modal.component';

describe('AddressModalComponent', () => {
  let component: AddressModalComponent;
  let fixture: ComponentFixture<AddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
