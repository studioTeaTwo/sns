import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLogsComponent } from './daily-logs.component';

describe('DailyLogsComponent', () => {
  let component: DailyLogsComponent;
  let fixture: ComponentFixture<DailyLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
