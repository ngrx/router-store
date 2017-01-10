import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';

import { RouterState } from '../src/reducer';
import * as routerActions from '../src/actions';
import { listenForRouterMethodActions, connectRouterActions } from '../src/connect';

describe('Router/Store Connectors', function() {
  describe('listenForRouterMethodActions', function() {
    let router: any;
    let location: any;
    let stringPath: string = '/path';
    let stringArray: any[] = [stringPath];
    let arrayPath: any[] = [stringPath, 1, { page: 1 }];
    let queryParams: any = { queryParams: { query: 'string' } };
    let extras: NavigationExtras = {
      fragment: 'test',
      relativeTo: null,
      preserveFragment: true,
      preserveQueryParams: true
    };

    beforeEach(function() {
      location = {
        back: jasmine.createSpy('back'),
        forward: jasmine.createSpy('forward')
      };

      router = {
        navigate: jasmine.createSpy('navigate'),
        navigateByUrl: jasmine.createSpy('navigate'),
        parseUrl: jasmine.createSpy('navigate').and.returnValue({}),
        replace: jasmine.createSpy('replace'),
        search: jasmine.createSpy('search'),
        show: jasmine.createSpy('show'),
        url: ''
      };
    });

    describe('should call Router@navigate when a "GO" action is dispatched', function() {
      it('with a string', function() {
        const action$ = Observable.of(routerActions.go(stringPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(stringArray, queryParams);
      });

      it('with an array', function() {
        const action$ = Observable.of(routerActions.go(arrayPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(['/path', 1, { page: 1 }], queryParams);
      });

      it('with extras', function() {
        const action$ = Observable.of(routerActions.go(arrayPath, { query: 'string' }, extras));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(['/path', 1, { page: 1 }], Object.assign({}, queryParams, extras));
      });
    });

    describe('should call Router@navigateByUrl when a "GO_TO_URL" action is dispatched', function() {
      it('with a string', function() {
        const action$ = Observable.of(routerActions.goToUrl(stringPath));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigateByUrl).toHaveBeenCalledWith(stringPath);
      });

      it('with extras', function() {
        const action$ = Observable.of(routerActions.goToUrl(stringPath, extras));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigateByUrl).toHaveBeenCalledWith('/path', Object.assign({}, extras));
      });
    });

    describe('should call Router@navigate when a "REPLACE" action is dispatched', function() {
      it('with a string', function() {
        const action$ = Observable.of(routerActions.replace(stringPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(stringArray, Object.assign({}, queryParams, { replaceUrl: true }));
      });

      it('with an array', function() {
        const action$ = Observable.of(routerActions.replace(arrayPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(arrayPath, Object.assign({}, queryParams, { replaceUrl: true }));
      });

      it('with extras', function() {
        const action$ = Observable.of(routerActions.replace(arrayPath, { query: 'string' }, extras));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(arrayPath, Object.assign({}, queryParams, { replaceUrl: true }, extras));
      });
    });
    describe('should call Router@navigate when a "SHOW" action is dispatched', function() {
      it('with a string', function() {
        const action$ = Observable.of(routerActions.show(stringPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(stringArray, Object.assign({}, queryParams, { skipLocationChange: true }));
      });

      it('with an array', function() {
        const action$ = Observable.of(routerActions.show(arrayPath, { query: 'string' }));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(arrayPath, Object.assign({}, queryParams, { skipLocationChange: true }));
      });

      it('with extras', function() {
        const action$ = Observable.of(routerActions.show(arrayPath, { query: 'string' }, extras));
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigate).toHaveBeenCalledWith(arrayPath, Object.assign({}, queryParams, { skipLocationChange: true }, extras));
      });
    });

    describe('should call Router@navigateByUrl when a "SEARCH" action is dispatched', function() {
      it('with query params', function() {
        const action$ = Observable.of(routerActions.search({ query: 'string' }));
        router.url = '/path';
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigateByUrl).toHaveBeenCalledWith(queryParams, { });
      });

      it('with extras', function() {
        const action$ = Observable.of(routerActions.search({ query: 'string' }, extras));
        router.url = '/path';
        listenForRouterMethodActions(router, location, action$);

        expect(router.navigateByUrl).toHaveBeenCalledWith(queryParams, extras);
      });
    });

    it('should call Location@back when a "BACK" action is dispatched', function() {
      const action$ = Observable.of(routerActions.back());
      listenForRouterMethodActions(router, location, action$);

      expect(location.back).toHaveBeenCalled();
    });

    it('should call Location@forward when a "FORWARD" action is dispatched', function() {
      const action$ = Observable.of(routerActions.forward());
      listenForRouterMethodActions(router, location, action$);

      expect(location.forward).toHaveBeenCalled();
    });

    it('should not call any router methods for unknown actions', function() {
      const action$ = Observable.of({ type: 'unknown action' });
      listenForRouterMethodActions(router, location, action$);

      expect(router.navigate).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
      expect(location.forward).not.toHaveBeenCalled();
      expect(location.back).not.toHaveBeenCalled();
    });
  });

  describe('connectRouterActions', function() {
    it('should map router updates into an "UPDATE_LOCATION" action', function(done) {
      const update: any = { path: '/some/path' };
      const router: any = {
        events: Observable.of(new NavigationEnd(1, '/some/path', '/some/path'))
      };

      done();
    });
  });
});
