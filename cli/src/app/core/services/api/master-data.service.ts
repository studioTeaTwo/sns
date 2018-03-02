import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Store } from 'app/core/store/store';
import { MasterAllergenGroup } from 'app/interfaces/api-models';

@Injectable()
export class MasterDataService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getAllergenGroups(): Observable<MasterAllergenGroup[]> {
    const masterAllergenGroups = this.store.getState().masterAllergenGroups;
    if (masterAllergenGroups.length > 0) {
      return of(masterAllergenGroups);
    } else {
      return this.httpClient.get<MasterAllergenGroup[]>(`/api/master_data/allergen_groups`).pipe(
        map(response => {
          this.onSuccessAllergenGroups(response);
          return response;
        }),
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
