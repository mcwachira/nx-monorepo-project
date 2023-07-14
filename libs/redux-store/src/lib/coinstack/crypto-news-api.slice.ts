import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const CRYPTO_NEWS_API_FEATURE_KEY = 'cryptoNewsApi';

/*
 * Update these interfaces according to your requirements.
 */
export interface CryptoNewsApiEntity {
  id: number;
}

export interface CryptoNewsApiState extends EntityState<CryptoNewsApiEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const cryptoNewsApiAdapter = createEntityAdapter<CryptoNewsApiEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchCryptoNewsApi())
 * }, [dispatch]);
 * ```
 */
export const fetchCryptoNewsApi = createAsyncThunk(
  'cryptoNewsApi/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getCryptoNewsApis()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialCryptoNewsApiState: CryptoNewsApiState =
  cryptoNewsApiAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const cryptoNewsApiSlice = createSlice({
  name: CRYPTO_NEWS_API_FEATURE_KEY,
  initialState: initialCryptoNewsApiState,
  reducers: {
    add: cryptoNewsApiAdapter.addOne,
    remove: cryptoNewsApiAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNewsApi.pending, (state: CryptoNewsApiState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCryptoNewsApi.fulfilled,
        (
          state: CryptoNewsApiState,
          action: PayloadAction<CryptoNewsApiEntity[]>
        ) => {
          cryptoNewsApiAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchCryptoNewsApi.rejected,
        (state: CryptoNewsApiState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const cryptoNewsApiReducer = cryptoNewsApiSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(cryptoNewsApiActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const cryptoNewsApiActions = cryptoNewsApiSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCryptoNewsApi);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = cryptoNewsApiAdapter.getSelectors();

export const getCryptoNewsApiState = (rootState: unknown): CryptoNewsApiState =>
  rootState[CRYPTO_NEWS_API_FEATURE_KEY];

export const selectAllCryptoNewsApi = createSelector(
  getCryptoNewsApiState,
  selectAll
);

export const selectCryptoNewsApiEntities = createSelector(
  getCryptoNewsApiState,
  selectEntities
);
