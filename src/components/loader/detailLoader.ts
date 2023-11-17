import { RequestType } from '../../actions/types';
import { getByName } from "../../api/QueryArgs";
import { dispatch } from '../../store/store';

export default async function detailLoader({ request, params }: RequestType) {
  console.log('detailLoader');

  const data = dispatch(getByName.initiate({ endpoint: params.endpoint, search: params.detail }))
  request.signal.onabort = data.abort
  return data.unwrap();
}
