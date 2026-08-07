import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionTitleComponent } from './home-section-title.component';

describe('HomeSectionTitleComponent', () => {
  let component: HomeSectionTitleComponent;
  let fixture: ComponentFixture<HomeSectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSectionTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
