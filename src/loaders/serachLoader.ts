import { RequestType } from '../actions/types';
import { getPaged } from '../store/api/swapi';
import { AppDispatch, AppGetState } from '../store/store';

const searchLoader =
  (dispatch: AppDispatch, getState: AppGetState) =>
  ({ request, params }: RequestType) => {
    console.log('searchLoader');

    const state = getState();

    const data = dispatch(
      getPaged.initiate({
        endpoint: params.endpoint ?? state.search.endpoint,
        page: +(params.page ?? 1),
        itemsPerPage: state.search.perPage,
        search: state.search.searchText,
      })
    );
    request.signal.onabort = data.abort.bind(data);
    return data.unwrap();
  };

export default searchLoader;
