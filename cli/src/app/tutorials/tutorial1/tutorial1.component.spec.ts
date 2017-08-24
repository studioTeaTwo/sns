import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tutorial1Component } from './tutorial1.component';

describe('Tutorial1Component', () => {
  let component: Tutorial1Component;
  let fixture: ComponentFixture<Tutorial1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tutorial1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tutorial1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
