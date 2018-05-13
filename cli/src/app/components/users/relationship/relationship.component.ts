import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from 'app/core/store/store';
import { Profile } from 'app/interfaces/api-models';
import { UserService } from 'app/core/services/api';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss'],
})
export class RelationshipComponent implements OnInit {
  users$ = this.store.select<Profile[]>(state => state.searchUsers);
  loading$ = this.store.select<boolean>(state => state.loading);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.route.url.subscribe(urls => {
      if (urls[0].path === 'followings') {
        this.userService.getFollowings();
      } else {
        this.userService.getFollowers();
      }
    });
  }

  onClickUser(value: Profile) {
    this.router.navigate([`/user/${value.id}`]);
  }

  onClickAllergen(value: string) {
    this.userService.searchByAllergenGroup(value);
  }
}
