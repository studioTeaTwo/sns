import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { RelationshipComponent } from './relationship/relationship.component';

@NgModule({
  imports: [CommonModule, SharedModule, UsersRoutingModule],
  declarations: [SettingComponent, ProfileComponent, RelationshipComponent],
})
export class UsersModule {}
