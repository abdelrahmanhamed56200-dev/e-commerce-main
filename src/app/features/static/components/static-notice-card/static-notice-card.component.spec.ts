import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticNoticeCardComponent } from './static-notice-card.component';

describe('StaticNoticeCardComponent', () => {
  let component: StaticNoticeCardComponent;
  let fixture: ComponentFixture<StaticNoticeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticNoticeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticNoticeCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
