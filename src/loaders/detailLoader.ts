import { RequestType } from '../actions/types';
import { getByName } from '../store/api/swapi';
import { AppDispatch } from '../store/store';

const detailLoader =
  (dispatch: AppDispatch) =>
  ({ request, params }: RequestType) => {
    console.log('detailLoader');

    const data = dispatch(getByName.initiate({ endpoint: params.endpoint, search: params.detail }));
    request.signal.onabort = data.abort.bind(data);
    return data.unwrap();
  };

export default detailLoader;
