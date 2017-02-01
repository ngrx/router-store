import { NgModule, APP_BOOTSTRAP_LISTENER, OpaqueToken } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Dispatcher, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  listenForRouterMethodActions,
  connectRouterActions,
  listenForStoreChanges
} from './connect';

export function setupRouterStore(
  router: Router,
  location: Location,
  dispatcher: Observable<Action>,
  store: Store<any>
) {
  return () => {
    listenForRouterMethodActions(router, location, dispatcher);
    connectRouterActions(router, store);
    listenForStoreChanges(router, store);
  };
}

export function provideRouterConnector() {
  return {
    provide: APP_BOOTSTRAP_LISTENER,
    deps: [ Router, Location, Dispatcher, Store ],
    useFactory: setupRouterStore,
    multi: true
  };
}

@NgModule({})
export class RouterStoreModule {
  static connectRouter() {
    return {
      ngModule: RouterStoreModule,
      providers: [
        provideRouterConnector()
      ]
    };
  }
}
