import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, concatMap, take } from 'rxjs/operators';

import { Store } from 'app/core/store/store';
import {
  UserService,
} from 'app/core/services/api';
import {
  MasterAllergenGroup,
  Profile,
} from 'app/interfaces/api-models';
import { AccountService, ChatService } from 'app/core/services/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile$ = this.store.select<Profile>(state => state.profile);
  isMyself = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private accountService: AccountService,
    private userService: UserService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
        this.userService.getProfile(params.get('userId'));
        this.accountService.get()
          .subscribe(
            response => this.isMyself = params.get('userId') === response.id.toString(),
            error => this.isMyself = true // ログイン外からのアクセス
          );
      });
  }

  getFollowingsLink(): string {
    return '/user/' + this.store.getState().profile.id + '/followings';
  }

  getFollowersLink(): string {
    return '/user/' + this.store.getState().profile.id + '/followers';
  }

  forwardChat() {
    this.profile$.pipe(
      map(data => data.id),
      concatMap(id => this.chatService.createChatThread(id)),
      take(1)
    )
    .subscribe(response => {
      this.router.navigate(['/chat', response.id]);
    });
}

  onClickSearch(value: string) {
    this.userService.searchByAllergenGroup(value);
    this.router.navigate(['search/results']);
  }

  onClickFollow() {
    this.userService.follow(this.store.getState().profile.id);
  }

  onClickUnfollow() {
    this.userService.unfollow(this.store.getState().profile.id);
  }

}
