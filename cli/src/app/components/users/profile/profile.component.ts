import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  UserService,
} from 'app/shared/services/api';
import {
  MasterAllergenGroup,
  Profile,
} from 'app/interfaces/api-models';
import { AccountService } from 'app/shared/services/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  JSON = JSON;
  profile$: Observable<Profile>;
  isMyself = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.profile$ = this.store.changes.pluck('profile') as Observable<Profile>;
    this.route.params.subscribe((params: Params) => {
        this.userService.getProfile(params['userId']);
        this.accountService.get().subscribe(response => this.isMyself = params['userId'] === response.id)
      });
  }

  onClick(value: string) {
    this.userService.searchByAllergenGroup(value);
    this.router.navigate(['search/results']);
  }

}
