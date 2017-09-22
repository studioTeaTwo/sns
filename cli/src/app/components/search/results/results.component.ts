import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import { Profile } from 'app/interfaces/api-models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  searchUsers$: Observable<Profile[]>;

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit() {
    this.searchUsers$ = this.store.changes.pluck('searchUsers');
  }

  onClick(value: Profile) {
    this.router.navigate([`/user/${value.id}`]);
  }
}
