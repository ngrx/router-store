<a name="1.2.6"></a>
## [1.2.6](https://github.com/ngrx/router-store/compare/v1.2.5...v1.2.6) (2017-04-20)


### Bug Fixes

* **deps:** Fixed peer dependencies for Angular 4.x ([#52](https://github.com/ngrx/router-store/issues/52)) ([6e63e9e](https://github.com/ngrx/router-store/commit/6e63e9e))
* **ngmodule:** Added empty object for NgModule metadata ([#39](https://github.com/ngrx/router-store/issues/39)) ([95e0021](https://github.com/ngrx/router-store/commit/95e0021))



<a name="1.2.5"></a>
## [1.2.5](https://github.com/ngrx/router-store/compare/v1.2.4...v1.2.5) (2016-10-13)


### Bug Fixes

* **reducer:** Added non-null value for initial state path ([#27](https://github.com/ngrx/router-store/issues/27)) ([2c776c5](https://github.com/ngrx/router-store/commit/2c776c5))



<a name="1.2.4"></a>
## [1.2.4](https://github.com/ngrx/router-store/compare/v1.2.3...v1.2.4) (2016-09-19)


### Bug Fixes

* **reducer:** Added initial state ([#25](https://github.com/ngrx/router-store/issues/25)) ([103fe1b](https://github.com/ngrx/router-store/commit/103fe1b)), closes [#24](https://github.com/ngrx/router-store/issues/24)



<a name="1.2.3"></a>
## [1.2.3](https://github.com/ngrx/router-store/compare/v1.2.2...v1.2.3) (2016-09-16)


### Bug Fixes

* **listener:** Fixed bug with listening for store changes ([#23](https://github.com/ngrx/router-store/issues/23)) ([821bebc](https://github.com/ngrx/router-store/commit/821bebc))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/ngrx/router-store/compare/v1.2.1...v1.2.2) (2016-09-15)


### Bug Fixes

* **docs:** Replaced ngrx/router with angular/router in package.json ([#19](https://github.com/ngrx/router-store/issues/19)) ([8242b1d](https://github.com/ngrx/router-store/commit/8242b1d))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/ngrx/router-store/compare/v1.2.0...v1.2.1) (2016-09-13)


### Bug Fixes

* **build:** Added [@angular](https://github.com/angular)/compiler-cli, [@angular](https://github.com/angular)/tsc-wrapped packages for build ([#17](https://github.com/ngrx/router-store/issues/17)) ([878a4a8](https://github.com/ngrx/router-store/commit/878a4a8))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/ngrx/router-store/compare/v1.1.0...v1.2.0) (2016-09-13)


### Features

* **actions:** Added support for router NavigationExtras ([#16](https://github.com/ngrx/router-store/issues/16)) ([e30cf16](https://github.com/ngrx/router-store/commit/e30cf16))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/ngrx/router-store/compare/v1.0.0...v1.1.0) (2016-08-30)


### Bug Fixes

* **actions:** Added show action to export ([#10](https://github.com/ngrx/router-store/issues/10)) ([5a1ed83](https://github.com/ngrx/router-store/commit/5a1ed83))


### Features

* **actions:** Added handling of an array for router actions ([#12](https://github.com/ngrx/router-store/issues/12)) ([3b4b827](https://github.com/ngrx/router-store/commit/3b4b827))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/ngrx/router-store/compare/v0.0.1...v1.0.0) (2016-08-27)


### Features

* **router-store:** Provide bindings to connect [@angular](https://github.com/angular)/router ([2af0ed4](https://github.com/ngrx/router-store/commit/2af0ed4)), closes [#3](https://github.com/ngrx/router-store/issues/3)


### BREAKING CHANGES

* **router-store:** Router API has changed internally

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



