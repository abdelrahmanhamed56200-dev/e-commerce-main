import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressModalInputComponent } from './address-modal-input.component';

describe('AddressModalInputComponent', () => {
  let component: AddressModalInputComponent;
  let fixture: ComponentFixture<AddressModalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressModalInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressModalInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
