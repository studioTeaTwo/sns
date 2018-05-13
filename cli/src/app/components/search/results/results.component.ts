import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from 'app/core/store/store';
import { User } from 'app/interfaces/api-models';
import { UserService } from 'app/core/services/api';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  searchUsers$ = this.store.select<User[]>(state => state.searchUsers);
  loading$ = this.store.select<boolean>(state => state.loading);

  constructor(private router: Router, private store: Store, private userService: UserService) {}

  ngOnInit() {}

  onClickUser(value: User) {
    this.router.navigate([`/user/${value.id}`]);
  }

  onClickAllergen(value: string) {
    this.userService.searchByAllergenGroup(value);
  }

  getPositiveAllergenGroups(user: User): string[] {
    return Object.keys(user).filter(key => key.match(/^allergen/) && user[key]);
  }
}
