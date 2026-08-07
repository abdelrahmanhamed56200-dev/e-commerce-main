import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundProducesComponent } from './not-found-produces.component';

describe('NotFoundProducesComponent', () => {
  let component: NotFoundProducesComponent;
  let fixture: ComponentFixture<NotFoundProducesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundProducesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundProducesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
