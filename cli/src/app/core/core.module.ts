import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Store } from './store/store';
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
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CoreMaterialModule } from './core-material/core-material.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [CommonModule, CoreMaterialModule],
  declarations: [],
  exports: [CoreMaterialModule],
  providers: [
    ApiInterceptor,
    ApiBaseService,
    MasterDataService,
    AccountService,
    ChatService,
    DailyLogService,
    FeedService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      // 必須：HTTP_INTERCEPTORSが配列であることを示す
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
