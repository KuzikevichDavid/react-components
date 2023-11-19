import { RequestType } from '../actions/types';
import { getByName } from '../store/api/swapi';
import { AppDispatch, AppGetState } from '../store/store';

const detailLoader =
  (dispatch: AppDispatch, getState: AppGetState) =>
  ({ request, params }: RequestType) => {
    console.log('detailLoader');

    const state = getState();

    const data = dispatch(
      getByName.initiate({
        endpoint: params.endpoint ?? state.search.endpoint,
        search: params.detail,
      })
    );
    request.signal.onabort = data.abort.bind(data);
    return data.unwrap();
  };

export default detailLoader;
