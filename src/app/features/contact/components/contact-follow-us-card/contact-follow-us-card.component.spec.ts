import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFollowUsCardComponent } from './contact-follow-us-card.component';

describe('ContactFollowUsCardComponent', () => {
  let component: ContactFollowUsCardComponent;
  let fixture: ComponentFixture<ContactFollowUsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFollowUsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFollowUsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
