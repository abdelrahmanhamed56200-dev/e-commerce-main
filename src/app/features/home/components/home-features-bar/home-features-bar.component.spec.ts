import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturesBarComponent } from './home-features-bar.component';

describe('HomeFeaturesBarComponent', () => {
  let component: HomeFeaturesBarComponent;
  let fixture: ComponentFixture<HomeFeaturesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturesBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturesBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
