import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsCardComponent } from './breadcrumbs-card.component';

describe('BreadcrumbsCardComponent', () => {
  let component: BreadcrumbsCardComponent;
  let fixture: ComponentFixture<BreadcrumbsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
