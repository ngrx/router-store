import { Action } from '@ngrx/store';
import { routerActions } from './actions';

export interface RouterState {
  path: string;
}

export const initialState: RouterState = {
  path: ''
};

export function routerReducer(state: RouterState = initialState, action: Action): RouterState {
  switch (action.type) {
    case routerActions.UPDATE_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
