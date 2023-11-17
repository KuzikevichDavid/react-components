import { RequestType } from '../actions/types';
import { getPaged } from '../store/api/swapi';
import { getState, dispatch } from '../store/store';

const searchLoader = ({ request, params }: RequestType) => {
  console.log('searchLoader');

  const state = getState();

  const data = dispatch(
    getPaged.initiate({
      endpoint: params.endpoint,
      page: +params.page,
      itemsPerPage: state.search.perPage,
      search: state.search.searchText,
    })
  );
  request.signal.onabort = data.abort.bind(data);
  return data.unwrap();
};

export default searchLoader;
