import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/core/store/store';
import { Profile } from 'app/interfaces/api-models';
import { UserService } from 'app/core/services/api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  searchUsers$ = this.store.select<Profile[]>(state => state.searchUsers);
  loading$ = this.store.select<boolean>(state => state.loading);

  constructor(private router: Router, private store: Store, private userService: UserService) {}

  ngOnInit() {}

  onClickUser(value: Profile) {
    this.router.navigate([`/user/${value.id}`]);
  }

  onClickAllergen(value: string) {
    this.userService.searchByAllergenGroup(value);
  }
}
