import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { RelationshipComponent } from './relationship/relationship.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: ':userId',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'followings',
        component: RelationshipComponent,
      },
      {
        path: 'followers',
        component: RelationshipComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
