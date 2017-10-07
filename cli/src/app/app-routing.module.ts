import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './components/navigations/top/top.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'home',
    canActivate: [ AuthGuard ],
    component: HomeComponent,
  },
  {
    path: 'chat',
    canActivate: [ AuthGuard ],
    loadChildren: './components/chats/chats.module#ChatsModule'
  },
  {
    path: 'life-log',
    canActivate: [ AuthGuard ],
    loadChildren: './components/life-logs/life-logs.module#LifeLogsModule'
  },
  {
    path: 'user',
    loadChildren: './components/users/users.module#UsersModule'
  },
  {
    path: 'search',
    loadChildren: './components/search/search.module#SearchModule'
  },
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
