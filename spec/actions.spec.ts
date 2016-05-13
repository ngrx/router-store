import * as actions from '../lib/actions';

describe('Actions', function() {
  it('should provide a "go" action creator', function() {
    expect(actions.go('/path', 'query=string')).toEqual({
      type: actions.routerActions.GO,
      payload: {
        path: '/path',
        query: 'query=string'
      }
    });
  });

  it('should provide a "replace" action creator', function() {
    expect(actions.replace('/path', 'query=string')).toEqual({
      type: actions.routerActions.REPLACE,
      payload: {
        path: '/path',
        query: 'query=string'
      }
    });
  });

  it('should provide a "search" action creator', function() {
    expect(actions.search('query=string')).toEqual({
      type: actions.routerActions.SEARCH,
      payload: {
        query: 'query=string'
      }
    });
  });

  it('should provide a "back" action creator', function() {
    expect(actions.back()).toEqual({
      type: actions.routerActions.BACK,
      payload: { }
    });
  });

  it('should provide a "forward" action creator', function() {
    expect(actions.forward()).toEqual({
      type: actions.routerActions.FORWARD,
      payload: { }
    });
  });
});
