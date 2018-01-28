import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigations/header/header.component';
import { GlobalMenuComponent } from './components/navigations/global-menu/global-menu.component';
import { AccountService } from 'app/core/services/api';
import { MockAccountService } from 'testing/api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        GlobalMenuComponent,
      ],
      providers: [
        Store,
        {
          provide: AccountService,
          useClass: MockAccountService
        },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
