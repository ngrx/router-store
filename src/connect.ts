import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { Router, Event, NavigationEnd, UrlTree } from '@angular/router';
import { Location } from '@angular/common';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { select } from '@ngrx/core';

import { RouterMethodCall, routerActions, routerActionTypes } from './actions';

export function listenForRouterMethodActions(router: Router, location: Location, actions$: Observable<Action>) {
  actions$
    .filter(action => routerActionTypes.indexOf(action.type) > -1)
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
  return router
    .events
    .filter((event: Event) => event instanceof NavigationEnd)
    .map(() => router.url)
    .distinctUntilChanged();
}

export function connectRouterActions(router: Router, store: Store<any>) {
  getLatestUrl(router)
    .withLatestFrom(selectRouter(store))
    .filter(([url, rs]) => (rs && rs.path !== url) || !rs)
    .map(([path]) => ({ type: routerActions.UPDATE_LOCATION, payload: { path } }))
    .subscribe(store);
}

export function listenForStoreChanges(router: Router, store: Store<any>) {
  selectRouter(store)
    .withLatestFrom(getLatestUrl(router))
    .filter(([rs, url]) => rs.path !== url)
    .map(([rs]) => rs.path)
    .do(url => router.navigateByUrl(url))
    .subscribe();
}
