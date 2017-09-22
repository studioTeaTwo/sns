import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './components/top/top.component';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'chat',
    loadChildren: './components/chats/chats.module#ChatsModule'
  },
  // {
  //   path: 'log',
  //   loadChildren: './components/lifelogs/lifelogs.module#LifelogsModule'
  // },
  {
    path: 'user',
    loadChildren: './components/users/users.module#UsersModule'
  },
  {
    path: 'search',
    loadChildren: './components/search/search.module#SearchModule'
  },
  // {
  //   path: 'auth',
  //   loadChildren: './components/auth/auth.module#AuthModule'
  // },
  // {
  //   path: 'account',
  //   loadChildren: './components/account/account.module#AccountModule'
  // },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
