import { Provider } from '@angular/core';

import { LOCATION_CHANGES_PROVIDER } from './location-changes';

export function connectRouterToStore() {
  return [
    LOCATION_CHANGES_PROVIDER
  ];
}

export {
  go,
  replace,
  search,
  back,
  forward,
  routerActions
} from './actions';

export {
  routerReducer,
  RouterState
} from './reducer';
