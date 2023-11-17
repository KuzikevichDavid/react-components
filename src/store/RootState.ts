import { DetailIsShowed } from './reducers/detailIsShowed/detailIsShowedSlice';
import { LoadingFlags } from './reducers/loadingFlag/loadingFlagSlice';
import { PagedResponse } from './reducers/response/pagedResponseSlice';
import { DetailResponse } from './reducers/response/responceSlice';
import { Search } from './reducers/search/searchSlice';

export interface RootState {
  search: Search;
  detailIsShowed: DetailIsShowed;
  pagedResponse: PagedResponse;
  detailResponse: DetailResponse;
  loadingFlags: LoadingFlags;
}
