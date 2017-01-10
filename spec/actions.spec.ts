import * as actions from '../src/actions';

describe('Actions', function() {
  it('should provide a "go" action creator', function() {
    expect(actions.go('/path', { query: 'string' })).toEqual({
      type: actions.routerActions.GO,
      payload: {
        path: '/path',
        query: { query: 'string' },
        extras: undefined
      }
    });

    expect(actions.go(['/path'], { query: 'string' })).toEqual({
      type: actions.routerActions.GO,
      payload: {
        path: ['/path'],
        query: { query: 'string' },
        extras: undefined
      }
    });
  });

  it('should provide a "goToUrl" action creator', function() {
    expect(actions.goToUrl('/path')).toEqual({
      type: actions.routerActions.GO_TO_URL,
      payload: {
        path: '/path',
        extras: undefined
      }
    });
  });

  it('should provide a "replace" action creator', function() {
    expect(actions.replace('/path', { query: 'string' })).toEqual({
      type: actions.routerActions.REPLACE,
      payload: {
        path: '/path',
        query: { query: 'string' },
        extras: undefined
      }
    });

    expect(actions.replace(['/path'], { query: 'string' })).toEqual({
      type: actions.routerActions.REPLACE,
      payload: {
        path: ['/path'],
        query: { query: 'string' },
        extras: undefined
      }
    });
  });

  it('should provide a "show" action creator', function() {
    expect(actions.show('/path', { query: 'string' })).toEqual({
      type: actions.routerActions.SHOW,
      payload: {
        path: '/path',
        query: { query: 'string' },
        extras: undefined
      }
    });

    expect(actions.show(['/path'], { query: 'string' })).toEqual({
      type: actions.routerActions.SHOW,
      payload: {
        path: ['/path'],
        query: { query: 'string' },
        extras: undefined
      }
    });
  });

  it('should provide a "search" action creator', function() {
    expect(actions.search({ query: 'string' })).toEqual({
      type: actions.routerActions.SEARCH,
      payload: {
        query: { query: 'string' },
        extras: undefined
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
