import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {
  UserService
} from 'app/shared/services/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileResponse: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params.concatMap((params: Params) =>
        this.userService.getProfile(params['userId']))
      .subscribe(response => {
        this.profileResponse = JSON.stringify(response);
      });
  }



}
