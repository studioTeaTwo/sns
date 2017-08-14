import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  ApiInterceptor,
  AccountService,
  UserService,
} from './services/api/index';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      // 必須：HTTP_INTERCEPTORSが配列であることを示す
      multi: true
    }
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AccountService,
        UserService,
      ]
    };
  }
}
