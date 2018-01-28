import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChatListComponent } from './chat-list.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService, ChatService } from 'app/core/services/api';
import { ShortenTextPipe, RoundOffDatePipe } from 'app/shared/pipes';
import { MockAccountService } from 'testing/api';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
      ],
      declarations: [
        ChatListComponent,
        RoundOffDatePipe,
        ShortenTextPipe,
      ],
      providers: [
        Store,
        {
          provide: AccountService,
          useClass: MockAccountService
        },
        ChatService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
