import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import { ChatService } from 'app/shared/services/api';
import { ChatListComponent } from './chat-list.component';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
      ],
      declarations: [ ChatListComponent ],
      providers: [
        Store,
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
