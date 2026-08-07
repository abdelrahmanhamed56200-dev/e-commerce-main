import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHelpCenterBannerComponent } from './contact-help-center-banner.component';

describe('ContactHelpCenterBannerComponent', () => {
  let component: ContactHelpCenterBannerComponent;
  let fixture: ComponentFixture<ContactHelpCenterBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHelpCenterBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactHelpCenterBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
