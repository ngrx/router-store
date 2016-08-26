import { Action } from '@ngrx/store';
import { routerActions } from './actions';

export interface RouterState {
  path: string;
}

export function routerReducer(state: RouterState = null, action: Action): RouterState {
  switch (action.type) {
    case routerActions.UPDATE_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
