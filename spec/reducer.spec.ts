
import { routerActions } from '../src/actions';
import { routerReducer, RouterState, initialState } from '../src/reducer';


describe('routerReducer', function() {
  it('should have an initial state', function() {
    const action = { type: 'unknown' };

    expect(routerReducer(initialState, action)).toEqual({ path: null });
  });

  it('should completely replace the state when a new location is pushed', function() {
    const payload = { path: '/some/path' };
    const action = { type: routerActions.UPDATE_LOCATION, payload };

    expect(routerReducer(undefined, action)).toBe(payload);
  });

  it('should return previous state for unknown actions', function() {
    const state: RouterState = { path: '/another/path' };
    const action = { type: 'unknown action' };

    expect(routerReducer(state, action)).toBe(state);
  });
});
