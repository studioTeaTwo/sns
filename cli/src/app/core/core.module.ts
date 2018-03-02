import { NgModule, ModuleWithProviders } from '@angular/core';
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

@NgModule({
  imports: [CommonModule, CoreMaterialModule],
  declarations: [],
  exports: [CoreMaterialModule],
  providers: [
    ApiBaseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      // 必須：HTTP_INTERCEPTORSが配列であることを示す
      multi: true,
    },
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
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
      ],
    };
  }
}
