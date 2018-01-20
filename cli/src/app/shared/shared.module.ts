import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'app/shared/rxjs-operators';

import { Store } from 'app/shared/store/store';
import { MaterialModule } from 'app/shared/material/material.module';
import {
  ApiInterceptor,
  ApiBaseService,
  MasterDataService,
  AccountService,
  ChatService,
  DailyLogService,
  FeedService,
  UserService,
} from './services/api';
import {
  FormatToJapaneseDatePipe,
  RoundOffDatePipe,
  ShortenTextPipe,
} from './pipes';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { AdminGuard } from 'app/shared/guards/admin.guard';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

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
    ImageUploadComponent,
  ],
  exports: [
    FormsModule,
    MaterialModule,

    FormatToJapaneseDatePipe,
    RoundOffDatePipe,
    ShortenTextPipe,

    ImageUploadComponent,
  ],
  providers: [
    ApiBaseService,
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
        ChatService,
        DailyLogService,
        FeedService,
        UserService,

        AuthGuard,
        AdminGuard,
      ]
    };
  }
}
