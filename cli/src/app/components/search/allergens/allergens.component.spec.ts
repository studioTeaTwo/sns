import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllergensComponent } from './allergens.component';

import { Store } from 'app/shared/store/store';
import {
  MasterDataService,
  UserService,
} from 'app/shared/services/api';

describe('AllergensComponent', () => {
  let component: AllergensComponent;
  let fixture: ComponentFixture<AllergensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ AllergensComponent ],
      providers: [
        Store,
        MasterDataService,
        UserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
