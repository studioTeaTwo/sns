import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TabsComponent } from './tabs.component';

import { SharedModule } from 'app/shared/shared.module';
import { Store } from 'app/shared/store/store';
import {
  MasterDataService,
  UserService,
} from 'app/shared/services/api';
import { AllergensComponent } from '../allergens/allergens.component';

describe('TabComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        SharedModule,
      ],
      declarations: [
        TabsComponent,
        AllergensComponent,
      ],
      providers: [
        Store,
        MasterDataService,
        UserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
