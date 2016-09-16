<a name="1.2.3"></a>
## [1.2.3](https://github.com/ngrx/router-store/compare/v0.0.1...v1.2.3) (2016-09-16)


### Bug Fixes

* **actions:** Added show action to export ([#10](https://github.com/ngrx/router-store/issues/10)) ([5a1ed83](https://github.com/ngrx/router-store/commit/5a1ed83))
* **build:** Added [@angular](https://github.com/angular)/compiler-cli, [@angular](https://github.com/angular)/tsc-wrapped packages for build ([#17](https://github.com/ngrx/router-store/issues/17)) ([878a4a8](https://github.com/ngrx/router-store/commit/878a4a8))
* **docs:** Replaced ngrx/router with angular/router in package.json ([#19](https://github.com/ngrx/router-store/issues/19)) ([8242b1d](https://github.com/ngrx/router-store/commit/8242b1d))
* **listener:** Fixed bug with listening for store changes ([#23](https://github.com/ngrx/router-store/issues/23)) ([821bebc](https://github.com/ngrx/router-store/commit/821bebc))


### Features

* **actions:** Added handling of an array for router actions ([#12](https://github.com/ngrx/router-store/issues/12)) ([3b4b827](https://github.com/ngrx/router-store/commit/3b4b827))
* **actions:** Added support for router NavigationExtras ([#16](https://github.com/ngrx/router-store/issues/16)) ([e30cf16](https://github.com/ngrx/router-store/commit/e30cf16))
* **router-store:** Provide bindings to connect [@angular](https://github.com/angular)/router ([2af0ed4](https://github.com/ngrx/router-store/commit/2af0ed4)), closes [#3](https://github.com/ngrx/router-store/issues/3)


### BREAKING CHANGES

* router-store: Router API has changed internally

BEFORE:

Use the `routerReducer` when providing `Store`:
  ```ts
  import { provideStore } from '@ngrx/store';
  import { routerReducer } from '@ngrx/router-store';
  
  
  export const storeProvider = provideStore({
    // Your reducers go here,
    router: routerReducer
  });
  ```

Install the bindings providers after you setup the router providers:
  ```ts
  import { connectRouterToStore } from '@ngrx/router-store';
  
  bootstrap(App, [
    storeProvider,
    provideRouter(routes),
    connectRouterToStore()
  ]);
  ```

AFTER:

Use the `routerReducer` when providing the `StoreModule.provideStore` and add the `RouterStoreModule.connectRouter()` to the `@NgModule.imports`:

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

BEFORE:

```ts
import {routerActions} from '@ngrx/store';

store.dispatch(routerActions.go('/path', 'query=string'));
store.dispatch(routerActions.replace('/path', 'query=string'));
store.dispatch(routerActions.search('query=string'));
```

AFTER:

```ts
import {routerActions} from '@ngrx/store';

store.dispatch(routerActions.go('/path', { query: 'string' ));
store.dispatch(routerActions.replace('/path', { query: 'string' ));
store.dispatch(routerActions.search({ query: 'string' ));
```



<a name="0.0.1"></a>
## 0.0.1 (2016-05-13)



