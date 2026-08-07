import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContactInfoComponent } from './contact-contact-info.component';

describe('ContactContactInfoComponent', () => {
  let component: ContactContactInfoComponent;
  let fixture: ComponentFixture<ContactContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactContactInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactContactInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
