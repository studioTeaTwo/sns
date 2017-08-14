import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComponent } from './top.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'app/shared/services/api';

describe('TopComponent', () => {
  let component: TopComponent;
  let fixture: ComponentFixture<TopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ TopComponent ],
      providers: [
        AccountService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
