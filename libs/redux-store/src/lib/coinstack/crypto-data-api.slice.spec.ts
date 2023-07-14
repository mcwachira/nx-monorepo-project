import {
  fetchCryptoDataApi,
  cryptoDataApiAdapter,
  cryptoDataApiReducer,
} from './crypto-data-api.slice';

describe('cryptoDataApi reducer', () => {
  it('should handle initial state', () => {
    const expected = cryptoDataApiAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(cryptoDataApiReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCryptoDataApis', () => {
    let state = cryptoDataApiReducer(
      undefined,
      fetchCryptoDataApi.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = cryptoDataApiReducer(
      state,
      fetchCryptoDataApi.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = cryptoDataApiReducer(
      state,
      fetchCryptoDataApi.rejected(new Error('Uh oh'), null, null)
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
