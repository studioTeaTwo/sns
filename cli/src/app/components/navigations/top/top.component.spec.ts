import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TopComponent } from './top.component';

import { Store } from 'app/core/store/store';
import { ApiBaseService, AccountService, ChatService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';

describe('TopComponent', () => {
  let component: TopComponent;
  let fixture: ComponentFixture<TopComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [TopComponent],
        providers: [
          Store,
          ApiBaseService,
          {
            provide: AccountService,
            useClass: MockAccountService,
          },
          ChatService,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
