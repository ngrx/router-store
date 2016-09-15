export default {
  entry: './release/index.js',
  dest: './release/bundles/router-store.umd.js',
  format: 'umd',
  moduleName: 'ngrx.routerStore',
  globals: {
    'rxjs/Observable': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/operator/do': 'Rx.Observable.prototype',
    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype',
    '@ngrx/core': 'ngrx.core'
  }
}
