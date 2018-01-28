import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TabsComponent } from './tabs.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import {
  MasterDataService,
  UserService,
} from 'app/core/services/api';
import { AllergensComponent } from '../allergens/allergens.component';
import { NameComponent } from '../name/name.component';
import { ResultsComponent } from '../results/results.component';
import { MockUserService } from 'testing/api';

describe('TabComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MaterialModule,
      ],
      declarations: [
        TabsComponent,
        AllergensComponent,
        NameComponent,
        ResultsComponent,
      ],
      providers: [
        Store,
        MasterDataService,
        {
          provide: UserService,
          useClass: MockUserService
        },
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
