import {
  fetchCryptoNewsApi,
  cryptoNewsApiAdapter,
  cryptoNewsApiReducer,
} from './crypto-news-api.slice';

describe('cryptoNewsApi reducer', () => {
  it('should handle initial state', () => {
    const expected = cryptoNewsApiAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(cryptoNewsApiReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCryptoNewsApis', () => {
    let state = cryptoNewsApiReducer(
      undefined,
      fetchCryptoNewsApi.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = cryptoNewsApiReducer(
      state,
      fetchCryptoNewsApi.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = cryptoNewsApiReducer(
      state,
      fetchCryptoNewsApi.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
