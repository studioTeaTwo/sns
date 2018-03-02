import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllergensComponent } from './allergens.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { Store } from 'app/core/store/store';
import { ApiBaseService, MasterDataService, UserService } from 'app/core/services/api';

describe('AllergensComponent', () => {
  let component: AllergensComponent;
  let fixture: ComponentFixture<AllergensComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
        declarations: [AllergensComponent],
        providers: [Store, ApiBaseService, MasterDataService, UserService],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
