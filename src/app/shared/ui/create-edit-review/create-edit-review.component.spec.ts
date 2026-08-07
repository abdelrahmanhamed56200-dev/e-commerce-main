import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReviewComponent } from './create-edit-review.component';

describe('CreateEditReviewComponent', () => {
  let component: CreateEditReviewComponent;
  let fixture: ComponentFixture<CreateEditReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
