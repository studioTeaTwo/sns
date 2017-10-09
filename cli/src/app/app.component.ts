import { Component } from '@angular/core';
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
    private store: Store,
  ) {
    this.loading$ = this.store.changes.pluck('loading');
    this.error$ = this.store.changes.pluck('error');
    this.errorMsg$ = this.store.changes.pluck('errorMsg');
  }
}
