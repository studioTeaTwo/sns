import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';

import { GlobalMenuComponent } from './global-menu.component';

import { SharedModule } from 'app/shared/shared.module';

describe('GlobalMenuComponent', () => {
  let component: GlobalMenuComponent;
  let fixture: ComponentFixture<GlobalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ GlobalMenuComponent ],
      providers: [
        SpyLocation
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
