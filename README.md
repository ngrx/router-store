# @ngrx/router-store
### Bindings to connect ngrx/router to ngrx/store


### Setup

1. Use npm to install the bindings:
```
npm install @ngrx/router-store --save
```

2. Use the `routerReducer` when providing `Store`:
```ts
import { provideStore } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';


export const storeProvider = provideStore({
  // Your reducers go here,
  router: routerReducer
});
```

3. Install the bindings providers after you setup the router providers:
```ts
import { connectRouterToStore } from '@ngrx/router-store';

bootstrap(App, [
  storeProvider,
  provideRouter(routes),
  connectRouterToStore()
]);
```
