import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  declarations: [UsersComponent],
})
export class AdminModule {}
