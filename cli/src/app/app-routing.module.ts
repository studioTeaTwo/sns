import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './components/top/top.component';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  // {
  //   path: 'chat',
  //   loadChildren: './components/chat/chat.module#ChatModule'
  // },
  // {
  //   path: 'log',
  //   loadChildren: './components/log/log.module#LogModule'
  // },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule'
  },
  // {
  //   path: 'search',
  //   loadChildren: './components/search/search.module#SearchModule'
  // },
  // {
  //   path: 'auth',
  //   loadChildren: './components/auth/auth.module#AuthModule'
  // },
  // {
  //   path: 'account',
  //   loadChildren: './components/account/account.module#AccountModule'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
