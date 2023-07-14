import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const CRYPTO_DATA_API_FEATURE_KEY = 'cryptoDataApi';

/*
 * Update these interfaces according to your requirements.
 */
export interface CryptoDataApiEntity {
  id: number;
}

export interface CryptoDataApiState extends EntityState<CryptoDataApiEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const cryptoDataApiAdapter = createEntityAdapter<CryptoDataApiEntity>();

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
 *   dispatch(fetchCryptoDataApi())
 * }, [dispatch]);
 * ```
 */
export const fetchCryptoDataApi = createAsyncThunk(
  'cryptoDataApi/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getCryptoDataApis()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialCryptoDataApiState: CryptoDataApiState =
  cryptoDataApiAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const cryptoDataApiSlice = createSlice({
  name: CRYPTO_DATA_API_FEATURE_KEY,
  initialState: initialCryptoDataApiState,
  reducers: {
    add: cryptoDataApiAdapter.addOne,
    remove: cryptoDataApiAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoDataApi.pending, (state: CryptoDataApiState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCryptoDataApi.fulfilled,
        (
          state: CryptoDataApiState,
          action: PayloadAction<CryptoDataApiEntity[]>
        ) => {
          cryptoDataApiAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchCryptoDataApi.rejected,
        (state: CryptoDataApiState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const cryptoDataApiReducer = cryptoDataApiSlice.reducer;

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
 *   dispatch(cryptoDataApiActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const cryptoDataApiActions = cryptoDataApiSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCryptoDataApi);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = cryptoDataApiAdapter.getSelectors();

export const getCryptoDataApiState = (rootState: unknown): CryptoDataApiState =>
  rootState[CRYPTO_DATA_API_FEATURE_KEY];

export const selectAllCryptoDataApi = createSelector(
  getCryptoDataApiState,
  selectAll
);

export const selectCryptoDataApiEntities = createSelector(
  getCryptoDataApiState,
  selectEntities
);
