import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'app/shared/rxjs-operators';

import { Store } from 'app/shared/store/store';
import { MaterialModule } from 'app/shared/material/material.module';
import {
  ApiInterceptor,
  AccountService,
  UserService,
} from './services/api';
import {
  FormatToJapaneseDatePipe,
  RoundOffDatePipe
} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
  ],
  exports: [
    MaterialModule,

    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
  ],
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
        Store,
        AccountService,
        UserService,
      ]
    };
  }
}
