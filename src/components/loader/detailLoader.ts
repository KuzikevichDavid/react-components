import { RequestType } from '../../actions/types';
import { fetchApi } from '../../api/swapi';

export default async function detailLoader({ params }: RequestType) {
  console.log('detailLoader', params);

  return fetchApi(params.endpoint, params.detail);
}
