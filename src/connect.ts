import { Location } from '@angular/common';
import { Router, Event, NavigationEnd, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { _do } from 'rxjs/operator/do';
import { filter } from 'rxjs/operator/filter';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { map } from 'rxjs/operator/map';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { Store, Action } from '@ngrx/store';
import { select } from '@ngrx/core';

import { RouterMethodCall, routerActions, routerActionTypes } from './actions';

export function listenForRouterMethodActions(router: Router, location: Location, actions$: Observable<Action>) {
  filter.call(actions$, action => routerActionTypes.indexOf(action.type) > -1)
    .subscribe(action => {
      const { path, query: queryParams, extras = {} }: RouterMethodCall = action.payload;
      let commands: any[] = Array.isArray(path) ? path : [path];

      switch (action.type) {
        case routerActions.GO:
          router.navigate(commands, Object.assign({}, extras, { queryParams }));
          break;

        case routerActions.REPLACE:
          router.navigate(commands, Object.assign({}, extras, { queryParams, replaceUrl: true }));
          break;

        case routerActions.SEARCH:
          let urlTree: UrlTree = router.parseUrl(router.url);
          urlTree.queryParams = queryParams;
          router.navigateByUrl(urlTree, extras);
          break;

        case routerActions.SHOW:
          router.navigate(commands, Object.assign({}, extras, { queryParams, skipLocationChange: true }));
          break;

        case routerActions.BACK:
          location.back();
          break;

        case routerActions.FORWARD:
          location.forward();
          break;
      }
    });
}

export function selectRouter(store: Store<any>) {
  return select.call(store, (state) => state.router);
}

export function getLatestUrl(router: Router): Observable<string> {
  const navigationEnd$ = filter.call(router.events, (event: Event) => event instanceof NavigationEnd);
  const navigationEndUrl$ = select.call(navigationEnd$, () => router.url);

  return navigationEndUrl$;
}

export function connectRouterActions(router: Router, store: Store<any>) {
  const routerAndStore$ = withLatestFrom.call(getLatestUrl(router), selectRouter(store));
  const mismatchUrl$ = filter.call(routerAndStore$, ([ url, rs ]) => (rs && rs.path !== url || !rs));
  const updateLocation$ = map.call(mismatchUrl$, ([ path ]) => {
    return { type: routerActions.UPDATE_LOCATION, payload: { path }};
  });

  updateLocation$.subscribe(store);
}

export function listenForStoreChanges(router: Router, store: Store<any>) {
  const storeAndRouter$ = withLatestFrom.call(selectRouter(store), getLatestUrl(router));
  const mismatch$ = filter.call(storeAndRouter$, ([ rs, url ]) => rs.path !== url);
  const newPath$ = map.call(mismatch$, ([ rs ]) => rs.path);

  newPath$.subscribe(url => router.navigateByUrl(url));
}
