import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { AllergensComponent } from './allergens/allergens.component';
import { ResultsComponent } from './results/results.component';
import { TabsComponent } from './tabs/tabs.component';
import { NameComponent } from './name/name.component';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, SharedModule],
  declarations: [AllergensComponent, ResultsComponent, TabsComponent, NameComponent],
})
export class SearchModule {}
