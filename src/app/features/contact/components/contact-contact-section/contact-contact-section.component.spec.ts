import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContactSectionComponent } from './contact-contact-section.component';

describe('ContactContactSectionComponent', () => {
  let component: ContactContactSectionComponent;
  let fixture: ComponentFixture<ContactContactSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactContactSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactContactSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
