import { configureStore } from '@reduxjs/toolkit';
import detailIsShowedSlice from '../features/detailIsShowedSlice';
import loadingFlagSlice, { LoadingFlags } from '../features/loadingFlag/loadingFlagSlice';
import pagedResponseSlice, { PagedResponse } from '../features/response/pagedResponseSlice';
import responseSlice, { DetailResponse } from '../features/response/responceSlice';
import searchSlice, { Search } from '../features/search/searchSlice';

export interface RootState {
  search: Search;
  detailIsShowed: boolean;
  pagedResponse: PagedResponse;
  detailResponse: DetailResponse;
  loadingFlags: LoadingFlags;
}

export const store = configureStore({
  reducer: {
    search: searchSlice,
    detailIsShowed: detailIsShowedSlice,
    pagedResponse: pagedResponseSlice,
    detailResponse: responseSlice,
    loadingFlags: loadingFlagSlice,
  },
});
