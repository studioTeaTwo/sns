import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MasterDataService, UserService } from 'app/core/services/api';
import { MasterAllergenGroup } from 'app/interfaces/api-models';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.scss'],
})
export class AllergensComponent implements OnInit {
  masterAllergenGroups: MasterAllergenGroup[];

  constructor(
    private router: Router,
    private masterDataService: MasterDataService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.masterDataService
      .getAllergenGroups()
      .subscribe(response => (this.masterAllergenGroups = response));
  }

  onClick(value: MasterAllergenGroup) {
    this.userService.searchByAllergenGroup(value.en);
    this.router.navigate(['search/results']);
  }
}
