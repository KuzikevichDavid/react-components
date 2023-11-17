import { configureStore } from '@reduxjs/toolkit';
import { swApi } from './api/swapi';
import detailIsShowedSlice from './reducers/detailIsShowed/detailIsShowedSlice';
import loadingFlagSlice from './reducers/loadingFlag/loadingFlagSlice';
import pagedResponseSlice from './reducers/response/pagedResponseSlice';
import responseSlice from './reducers/response/responceSlice';
import searchSlice from './reducers/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    detailIsShowed: detailIsShowedSlice,
    pagedResponse: pagedResponseSlice,
    detailResponse: responseSlice,
    loadingFlags: loadingFlagSlice,
    swapi: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
});

const dispatch = store.dispatch.bind(store);
const getState = store.getState.bind(store);

export { dispatch, getState };
