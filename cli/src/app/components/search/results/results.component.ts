import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { Profile } from 'app/interfaces/api-models';
import { UserService } from 'app/shared/services/api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  searchUsers$: Observable<Profile[]>;
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.searchUsers$ = this.store.changes.pluck('searchUsers');
    this.loading$ = this.store.changes.pluck('loading');
  }

  onClickUser(value: Profile) {
    this.router.navigate([`/user/${value.id}`]);
  }

  onClickAllergen(value: string) {
    this.userService.searchByAllergenGroup(value);
  }
}
