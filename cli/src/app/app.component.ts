import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UrlSerializer, Router } from '@angular/router';

import { Store } from 'app/core/store/store';
import { AccountService } from 'app/core/services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = this.store.select<boolean>(state => state.loading);
  error$ = this.store.select<boolean>(state => state.error);
  errorMsg$ = this.store.select<string>(state => state.errorMsg);
  height: number;

  constructor(
    private location: Location,
    private router: Router,
    private urlSerializer: UrlSerializer,
    private store: Store,
    private accountService: AccountService,
  ) {
    this.height = window.innerHeight - 42 - 50; // 42 = header.height 50 = footer.height

    // index.htmlの初回ロード用タグを消去する
    const initialElm = document.getElementById('initial-paint') as HTMLDivElement;
    if (initialElm) {
      initialElm.remove();
    }

    // ログインしてたらホームに移動する
    if (this.location.path() === '') {
      this.accountService.isLoggedIn().then((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/home');
        }
      });
    }

    // フロントのURLでサーバに飛んだ時の対応
    if (this.location.path().match(/url/)) {
      const urlTree = this.urlSerializer.parse(this.location.path());
      this.location.replaceState(urlTree.queryParams['url']);
    }
  }

  onDeactive() {
    if (this.location.path().match(/(results|user|chat)/)) {
      return;
    }
    window.scrollTo(0, 0);
  }
}
