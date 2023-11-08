import { RequestType } from '../../actions/types';
import { fetchApi } from '../../api/swapi';
import { storageAPIKey } from '../search/storageKeys';

export default async function detailLoader({ params, context }: RequestType) {
  console.log('detailLoader', context);
  console.log(params);

  const apiEndpoint = localStorage.getItem(storageAPIKey) ?? 'people';

  return fetchApi(apiEndpoint, params.detail);
}
