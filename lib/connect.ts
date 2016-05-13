import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Router, LocationChange } from '@ngrx/router';
import { Action, Dispatcher, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RouterState } from './reducer';
import { RouterMethodCall, routerActions, routerActionTypes } from './actions';

export function projectLocationChanges(state$: Store<{ router: RouterState }>): Observable<LocationChange> {
  return state$.select(s => s.router).filter(change => change !== null);
}

export function listenForRouterMethodActions(router: Router, actions$: Observable<Action>) {
  actions$
    .filter(action => routerActionTypes.indexOf(action.type) > -1)
    .subscribe(action => {
      const { path, query }: RouterMethodCall = action.payload;

      switch (action.type) {
        case routerActions.GO:
          router.go(path, query);
          break;

        case routerActions.REPLACE:
          router.go(path, query);
          break;

        case routerActions.SEARCH:
          router.search(query);
          break;

        case routerActions.BACK:
          router.back();
          break;

        case routerActions.FORWARD:
          router.forward();
      }
    });
}

export function connectRouterActions(router: Router, store: Store<any>) {
  router
    .map(change => ({ type: routerActions.UPDATE_LOCATION, payload: change }))
    .subscribe(store);
}
