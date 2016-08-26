# @ngrx/router-store
### Bindings to connect angular/router to ngrx/store


### Setup

1. Use npm to install the bindings:
  ```
  npm install @ngrx/router-store --save
  ```

2. Use the `routerReducer` when providing the `StoreModule.provideStore` and add the `RouterStoreModule.connectRouter` to the `@NgModule.imports`:

  ```ts
  import { StoreModule } from '@ngrx/store';
  import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

  @NgModule({
    imports: [
      BrowserModule,
      StoreModule.provideStore({ router: routerReducer }),
      RouterStoreModule.connectRouter()
    ],
    bootstrap: [ AppComponent ]
  })
  export class AppModule {
  }
  ```

3. Add `RouterState` to main application state:

  ```ts
  import { RouterState } from '@ngrx/router-store';
  
  export interface AppState {
    router: RouterState;
  };
  ```

### Dispatching actions

```ts
import {routerActions} from '@ngrx/store-store';

// ...
store.dispatch(routerActions.go('/path', { query: 'string' ));
store.dispatch(routerActions.replace('/path', { query: 'string' ));
store.dispatch(routerActions.search({ query: 'string' ));
```
