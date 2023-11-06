import { RequestType } from '../../actions/types';
import { fetchApi } from '../../api/swapi';
import { storageAPIKey } from '../search/storageKeys';

export default async function detailLoader({ params }: RequestType) {
  console.log('detailLoader');
  const apiEndpoint = localStorage.getItem(storageAPIKey) ?? 'people';

  return fetchApi(apiEndpoint, params.detail);
}
