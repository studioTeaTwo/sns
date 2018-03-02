import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from 'app/components/navigations/top/top.component';

import { ContactComponent } from 'app/components/navigations/contact/contact.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { AdminGuard } from 'app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './components/home/home.module#HomeModule',
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: './components/chats/chats.module#ChatsModule',
  },
  {
    path: 'life-log',
    canActivate: [AuthGuard],
    loadChildren: './components/life-logs/life-logs.module#LifeLogsModule',
  },
  {
    path: 'user',
    loadChildren: './components/users/users.module#UsersModule',
  },
  {
    path: 'search',
    loadChildren: './components/search/search.module#SearchModule',
  },
  // {
  //   path: 'account',
  //   loadChildren: './components/account/account.module#AccountModule'
  // },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule',
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './components/admin/admin.module#AdminModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
