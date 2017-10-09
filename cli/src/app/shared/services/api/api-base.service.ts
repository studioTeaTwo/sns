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

  setLoading() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: true,
      error: false,
      errorMsg: '',
    });
  }

  onSuccess() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: false,
      error: false,
      errorMsg: '',
    });
  }

  onError(msg?: string) {
    const currentState = this.store.getState();
    const newState = msg ? msg : '';
    this.store.setState({
      ...currentState,
      loading: false,
      error: true,
      errorMsg: newState,
    });
  }

  onNotFound(data: any) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      ...data,
      error: true,
    });
  }
}
