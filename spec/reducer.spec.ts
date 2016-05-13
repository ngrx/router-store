
import { routerActions } from '../lib/actions';
import { routerReducer, RouterState } from '../lib/reducer';


describe('routerReducer', function() {
  it('should completely replace the state when a new location is pushed', function() {
    const payload = { path: '/some/path', type: 'push' };
    const action = { type: routerActions.UPDATE_LOCATION, payload };

    expect(routerReducer(undefined, action)).toBe(payload);
  });

  it('should return previous state for unknown actions', function() {
    const state: RouterState = { path: '/another/path', type: 'pop' };
    const action = { type: 'unknown action' };

    expect(routerReducer(state, action)).toBe(state);
  });
});
