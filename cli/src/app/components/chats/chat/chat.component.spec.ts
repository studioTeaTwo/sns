import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService, ChatService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';
import { ChatListComponent } from 'app/components/chats/chat-list/chat-list.component';
import { FormatToJapaneseDatePipe, RoundOffDatePipe, ShortenTextPipe } from 'app/shared/pipes';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([{ path: 'chat/list', component: ChatListComponent }]),
          NoopAnimationsModule,
          FormsModule,
          MaterialModule,
        ],
        declarations: [
          ChatComponent,
          ChatListComponent,
          FormatToJapaneseDatePipe,
          RoundOffDatePipe,
          ShortenTextPipe,
        ],
        providers: [
          Store,
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
