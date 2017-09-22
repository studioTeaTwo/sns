import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'app/shared/rxjs-operators';

import { Store } from 'app/shared/store/store';
import { MaterialModule } from 'app/shared/material/material.module';
import {
  ApiInterceptor,
  MasterDataService,
  AccountService,
  UserService,
  ChatService,
} from './services/api';
import {
  FormatToJapaneseDatePipe,
  RoundOffDatePipe
} from './pipes';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
    ShortenTextPipe,
  ],
  exports: [
    FormsModule,
    MaterialModule,

    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
    ShortenTextPipe,
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

        MasterDataService,
        AccountService,
        UserService,
        ChatService
      ]
    };
  }
}
