import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from 'app/shared/store/store';
import {
  UserService
} from 'app/shared/services/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  JSON = JSON;
  profileResponse$: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.profileResponse$ = this.store.changes.pluck('profile');
    this.route.params.subscribe((params: Params) =>
        this.userService.getProfile(params['userId'])
      );
  }



}
