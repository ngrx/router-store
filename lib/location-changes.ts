import { Provider } from '@angular/core';
import { LOCATION_CHANGES, LocationChange, Router } from '@ngrx/router';
import { Dispatcher, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { listenForRouterMethodActions, connectRouterActions, projectLocationChanges } from './connect';


export const LOCATION_CHANGES_PROVIDER = new Provider(LOCATION_CHANGES, {
  deps: [ Router, Dispatcher, Store ],
  useFactory(router: Router, dispatcher: Observable<Action>, store: Store<any>): Observable<LocationChange> {
    listenForRouterMethodActions(router, dispatcher);
    connectRouterActions(router, store);

    return projectLocationChanges(store);
  }
});
