import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { AllergensComponent } from './allergens/allergens.component';
import { ResultsComponent } from './results/results.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    AllergensComponent,
    ResultsComponent,
    TabsComponent
  ]
})
export class SearchModule { }
