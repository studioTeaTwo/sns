import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  MasterAllergenGroup,
} from 'app/interfaces/api-models';

@Injectable()
export class MasterDataService {

  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) { }

  getAllergenGroups(): Observable<MasterAllergenGroup[]> {
    const masterAllergenGroups = this.store.getState().masterAllergenGroups;
    if (masterAllergenGroups.length > 0) {
      return Observable.of(masterAllergenGroups);
    } else {
      return this.httpClient.get<MasterAllergenGroup[]>(`/api/master_data/allergen_groups`)
      .map(
        response => {
          this.onSuccessAllergenGroups(response);
          return response;
        }
      );
    }
  }

  private onSuccessAllergenGroups(data: MasterAllergenGroup[]) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      masterAllergenGroups: data,
      loading: false,
      error: false,
    });
  }
}
