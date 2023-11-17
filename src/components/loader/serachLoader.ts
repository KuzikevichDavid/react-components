import { RequestType } from '../../actions/types';
import { getPaged } from "../../api/QueryArgs";
import { dispatch, getState } from '../../store/store';

async function searchLoader({ request, params }: RequestType) {
  console.log('searchLoader');

  const state = getState()

  const data = dispatch(getPaged.initiate({ endpoint: params.endpoint, page: +params.page, itemsPerPage: state.search.perPage, search: state.search.searchText }))
  request.signal.onabort = data.abort
  return data.unwrap();
}

export default searchLoader