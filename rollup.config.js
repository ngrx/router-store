export default {
  entry: './release/index.js',
  dest: './release/bundles/router-store.umd.js',
  format: 'umd',
  moduleName: 'ngrx.routerStore',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/router': 'ng.router',
    '@ngrx/store': 'ngrx.store',
    '@ngrx/core': 'ngrx.core',
    'rxjs/Observable': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'rxjs/operator/do': 'Rx.Observable.prototype',
    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype',
    'rxjs/operator/withLatestFrom': 'Rx.Observable.prototype'
  }
}
