import { Action } from '@ngrx/store';

export interface RouterMethodCall {
  path?: string | any[];
  query?: any;
}

export const routerActions = {
  GO: '[Router] Go',
  REPLACE: '[Router] Replace',
  SEARCH: '[Router] Search',
  SHOW: '[Router] Show',
  BACK: '[Router] Back',
  FORWARD: '[Router] Forward',
  UPDATE_LOCATION: '[Router] Update Location'
};

export const routerActionTypes = Object.keys(routerActions).map(key => routerActions[key]);

export function go(path: string|any[], query?: any): Action {
  const payload: RouterMethodCall = { path, query };

  return { type: routerActions.GO, payload };
}

export function replace(path: string|any[], query?: any): Action {
  const payload: RouterMethodCall = { path, query };

  return { type: routerActions.REPLACE, payload };
}

export function search(query: any): Action {
  const payload: RouterMethodCall = { query };

  return { type: routerActions.SEARCH, payload };
}

export function show(path: string|any[], query?: any): Action {
  const payload: RouterMethodCall = { path, query };

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
