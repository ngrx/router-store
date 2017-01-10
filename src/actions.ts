import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export interface RouterMethodCall {
  path?: string | any[];
  query?: any;
  extras?: NavigationExtras;
}

export const routerActions = {
  GO: '[Router] Go',
  GO_TO_URL: '[Router] Go to URL',
  REPLACE: '[Router] Replace',
  SEARCH: '[Router] Search',
  SHOW: '[Router] Show',
  BACK: '[Router] Back',
  FORWARD: '[Router] Forward',
  UPDATE_LOCATION: '[Router] Update Location'
};

export const routerActionTypes = Object.keys(routerActions).map(key => routerActions[key]);

export function go(path: string|any[], query?: any, extras?: NavigationExtras): Action {
  const payload: RouterMethodCall = { path, query, extras };

  return { type: routerActions.GO, payload };
}

export function goToUrl(path: string, extras?: NavigationExtras): Action {
  const payload: RouterMethodCall = { path, extras };

  return { type: routerActions.GO_TO_URL, payload };
}

export function replace(path: string|any[], query?: any, extras?: NavigationExtras): Action {
  const payload: RouterMethodCall = { path, query, extras };

  return { type: routerActions.REPLACE, payload };
}

export function search(query: any, extras?: NavigationExtras): Action {
  const payload: RouterMethodCall = { query, extras };

  return { type: routerActions.SEARCH, payload };
}

export function show(path: string|any[], query?: any, extras?: NavigationExtras): Action {
  const payload: RouterMethodCall = { path, query, extras };

  return { type: routerActions.SHOW, payload };
}

export function back(): Action {
  const payload: RouterMethodCall = { };

  return { type: routerActions.BACK, payload };
}

export function forward(): Action {
  const payload: RouterMethodCall = { };

  return { type: routerActions.FORWARD, payload };
}
