import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { swApi } from './api/swapi';
import detailIsShowedSlice from './reducers/detailIsShowed/detailIsShowedSlice';
import loadingFlagSlice from './reducers/loadingFlag/loadingFlagSlice';
import pagedResponseSlice from './reducers/response/pagedResponseSlice';
import responseSlice from './reducers/response/responceSlice';
import searchSlice from './reducers/search/searchSlice';

const rootReducer = combineReducers({
  search: searchSlice,
  detailIsShowed: detailIsShowedSlice,
  pagedResponse: pagedResponseSlice,
  detailResponse: responseSlice,
  swapi: swApi.reducer,
  loadingFlags: loadingFlagSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppGetState = AppStore['getState'];

const setupCarry = () => setupStore();
export const makeWrapper = (debug = true) => createWrapper<AppStore>(setupCarry, { debug });
export const wrapper = createWrapper<AppStore>(setupCarry, { debug: false });
