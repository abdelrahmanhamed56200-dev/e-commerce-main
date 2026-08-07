import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsPageComponent } from './terms-and-conditions-page.component';

describe('TermsAndConditionsPageComponent', () => {
  let component: TermsAndConditionsPageComponent;
  let fixture: ComponentFixture<TermsAndConditionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
