import { Injectable } from '@angular/core';

import { Store } from 'app/shared/store/store';

@Injectable()
export class ApiBaseService {

  constructor(
    private store: Store,
  ) { }

  resetBeforeRequest(data: any) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      ...data,
    });
  }

  onSuccess() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: false,
      error: false,
    });
  }

  onNotFound(data: any) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      ...data,
      loading: false,
      error: false,
    });
  }
}
