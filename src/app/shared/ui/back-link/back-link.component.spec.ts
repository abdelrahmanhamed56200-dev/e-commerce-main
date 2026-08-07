import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLinkComponent } from './back-link.component';

describe('BackLinkComponent', () => {
  let component: BackLinkComponent;
  let fixture: ComponentFixture<BackLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackLinkComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
