import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ChatComponent } from './chat.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import { AccountService, ChatService } from 'app/shared/services/api';
import { MockAccountService } from 'app/mock/api/mock-account-service';
import { ChatListComponent } from 'app/components/chats/chat-list/chat-list.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'chat/list', component: ChatListComponent}
        ]),
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        ChatComponent,
        ChatListComponent
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
