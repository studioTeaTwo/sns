import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UrlSerializer } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$ = this.store.select<boolean>(state => state.loading);
  error$ = this.store.select<boolean>(state => state.error);
  errorMsg$ = this.store.select<string>(state => state.errorMsg);

  constructor(
    private location: Location,
    private urlSerializer: UrlSerializer,
    private store: Store,
  ) {
    // フロントのURLでサーバに飛んだ時の対応
    if (this.location.path().match(/url/)) {
      const urlTree = this.urlSerializer.parse(this.location.path());
      this.location.replaceState(urlTree.queryParams['url']);
    }
  }

  onDeactive() {
    if (this.location.path().match(/(results|user)/)) {
      return;
    }
    window.scrollTo(0, 0);
  }
}
