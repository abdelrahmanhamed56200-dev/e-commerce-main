import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticInfoCardComponent } from './static-info-card.component';

describe('StaticInfoCardComponent', () => {
  let component: StaticInfoCardComponent;
  let fixture: ComponentFixture<StaticInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticInfoCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
