import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPrivacyAndTermActionButtonsComponent } from './static-privacy-and-term-action-buttons.component';

describe('StaticPrivacyAndTermActionButtonsComponent', () => {
  let component: StaticPrivacyAndTermActionButtonsComponent;
  let fixture: ComponentFixture<StaticPrivacyAndTermActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticPrivacyAndTermActionButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticPrivacyAndTermActionButtonsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
