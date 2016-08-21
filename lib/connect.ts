import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import '@ngrx/core/add/operator/select';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { RouterMethodCall, routerActions, routerActionTypes } from './actions';

export function listenForRouterMethodActions(router: Router, location: Location, actions$: Observable<Action>) {
  actions$
    .filter(action => routerActionTypes.indexOf(action.type) > -1)
    .subscribe(action => {
      const { path, query: queryParams }: RouterMethodCall = action.payload;
      let commands: any[] = [path];

      switch (action.type) {
        case routerActions.GO:
          router.navigate(commands, { queryParams });
          break;

        case routerActions.REPLACE:
          router.navigate(commands, { queryParams, replaceUrl: true });
          break;

        case routerActions.SEARCH:
          let url = router.url;
          let command = url.split(/\?/)[0];
          router.navigate([command], { queryParams });
          break;

        case routerActions.SHOW:
          router.navigate(commands, { queryParams, skipLocationChange: true });
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
  return store.select(state => state.router);
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
