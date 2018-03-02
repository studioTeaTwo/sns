import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AccountService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/navigations/header/header.component';
import { GlobalMenuComponent } from './components/navigations/global-menu/global-menu.component';
import { TopComponent } from './components/navigations/top/top.component';
import { ContactComponent } from './components/navigations/contact/contact.component';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule, AppRoutingModule],
        declarations: [
          AppComponent,
          HeaderComponent,
          GlobalMenuComponent,
          TopComponent,
          ContactComponent,
        ],
        providers: [
          Store,
          {
            provide: AccountService,
            useClass: MockAccountService,
          },
          {
            provide: APP_BASE_HREF,
            useValue: '/',
          },
        ],
      }).compileComponents();
    }),
  );

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );
});
