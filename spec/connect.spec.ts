import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { LocationChange } from '@ngrx/router';

import { RouterState } from '../lib/reducer';
import * as routerActions from '../lib/actions';
import { projectLocationChanges, listenForRouterMethodActions, connectRouterActions } from '../lib/connect';

describe('Router/Store Connectors', function() {
  describe('projectLocationChanges', function() {
    it('should project the router state from a larger state tree', function() {
      const routerState: RouterState = { path: '/some/path', type: 'push' };
      const state$ = Observable.of({
        router: routerState
      });

      projectLocationChanges(state$).subscribe(state => {
        expect(state).toBe(routerState);
      });
    });

    it('should skip null states', function() {
      const state$ = Observable.of({
        router: null
      });

      const observer = {
        next: jasmine.createSpy('next'),
        error: jasmine.createSpy('error'),
        complete: jasmine.createSpy('complete')
      };

      projectLocationChanges(state$).subscribe(observer);

      expect(observer.next).not.toHaveBeenCalled();
      expect(observer.error).not.toHaveBeenCalled();
      expect(observer.complete).toHaveBeenCalled();
    });
  });

  describe('listenForRouterMethodActions', function() {
    let router: any;

    beforeEach(function() {
      router = {
        go: jasmine.createSpy('go'),
        replace: jasmine.createSpy('replace'),
        search: jasmine.createSpy('search'),
        back: jasmine.createSpy('back'),
        forward: jasmine.createSpy('forward')
      };
    });

    it('should call Router@go when a "GO" action is dispatched', function() {
      const action$ = Observable.of(routerActions.go('/path', 'query=string'));
      listenForRouterMethodActions(router, action$);

      expect(router.go).toHaveBeenCalledWith('/path', 'query=string');
    });

    it('should call Router@replace when a "REPLACE" action is dispatched', function() {
      const action$ = Observable.of(routerActions.replace('/path', 'query=string'));
      listenForRouterMethodActions(router, action$);

      expect(router.replace).toHaveBeenCalledWith('/path', 'query=string');
    });

    it('should call Router@search when a "SEARCH" action is dispatched', function() {
      const action$ = Observable.of(routerActions.search('query=string'));
      listenForRouterMethodActions(router, action$);

      expect(router.search).toHaveBeenCalledWith('query=string');
    });

    it('should call Router@back when a "BACK" action is dispatched', function() {
      const action$ = Observable.of(routerActions.back());
      listenForRouterMethodActions(router, action$);

      expect(router.back).toHaveBeenCalled();
    });

    it('should call Router@forward when a "FORWARD" action is dispatched', function() {
      const action$ = Observable.of(routerActions.forward());
      listenForRouterMethodActions(router, action$);

      expect(router.forward).toHaveBeenCalled();
    });

    it('should not call any router methods for unknown actions', function() {
      const action$ = Observable.of({ type: 'unknown action' });
      listenForRouterMethodActions(router, action$);

      expect(router.go).not.toHaveBeenCalled();
      expect(router.replace).not.toHaveBeenCalled();
      expect(router.search).not.toHaveBeenCalled();
      expect(router.forward).not.toHaveBeenCalled();
      expect(router.back).not.toHaveBeenCalled();
    });
  });

  describe('connectRouterActions', function() {
    it('should map router updates into an "UPDATE_LOCATION" action', function(done) {
      const update: LocationChange = { path: '/some/path', type: 'pop' };
      const router$ = Observable.of(update);

      connectRouterActions(router$, {
        next(action) {
          expect(action.type).toBe(routerActions.routerActions.UPDATE_LOCATION);
          expect(action.payload).toBe(update);
        },
        error: done,
        complete: done
      });
    });
  });
});
