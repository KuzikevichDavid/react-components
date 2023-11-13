import { RequestType } from '../../actions/types';
import { fetchApi } from '../../api/swapi';

export default async function detailLoader({ params }: RequestType) {
  return fetchApi(params.endpoint, params.detail);
}
