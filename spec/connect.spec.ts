import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import { RouterState } from '../lib/reducer';
import * as routerActions from '../lib/actions';
import { listenForRouterMethodActions, connectRouterActions } from '../lib/connect';

describe('Router/Store Connectors', function() {
  describe('listenForRouterMethodActions', function() {
    let router: any;
    let location: any;

    beforeEach(function() {
      location = {
        back: jasmine.createSpy('back'),
        forward: jasmine.createSpy('forward')
      };

      router = {
        navigate: jasmine.createSpy('navigate'),
        replace: jasmine.createSpy('replace'),
        search: jasmine.createSpy('search'),
        show: jasmine.createSpy('show')
      };
    });

    it('should call Router@navigate when a "GO" action is dispatched', function() {
      const action$ = Observable.of(routerActions.go('/path', 'query=string'));
      listenForRouterMethodActions(router, location, action$);

      expect(router.navigate).toHaveBeenCalledWith(['/path'], { queryParams: 'query=string' });
    });

    it('should call Router@navigate when a "REPLACE" action is dispatched', function() {
      const action$ = Observable.of(routerActions.replace('/path', 'query=string'));
      listenForRouterMethodActions(router, location, action$);

      expect(router.navigate).toHaveBeenCalledWith(['/path'], { queryParams: 'query=string', replaceUrl: true });
    });

    it('should call Router@navigate when a "SEARCH" action is dispatched', function() {
      const action$ = Observable.of(routerActions.search('query=string'));
      router.url = '/path';
      listenForRouterMethodActions(router, location, action$);

      expect(router.navigate).toHaveBeenCalledWith(['/path'], { queryParams: 'query=string' });
    });

    it('should call Router@navigate when a "SHOW" action is dispatched', function() {
      const action$ = Observable.of(routerActions.show('/path', 'query=string'));
      listenForRouterMethodActions(router, location, action$);

      expect(router.navigate).toHaveBeenCalledWith(['/path'], { queryParams: 'query=string', skipLocationChange: true });
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
