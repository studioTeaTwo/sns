import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  errorMsg$: Observable<string>;

  constructor(
    private location: Location,
    private store: Store,
  ) {
    this.loading$ = this.store.changes.pluck('loading');
    this.error$ = this.store.changes.pluck('error');
    this.errorMsg$ = this.store.changes.pluck('errorMsg');
  }

  onDeactive() {
    if (this.location.path().match(/(results|user)/)) {
      return;
    }
    window.scrollTo(0, 0);
  }
}
