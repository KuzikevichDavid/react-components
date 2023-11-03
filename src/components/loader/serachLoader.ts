import { RequestType } from '../../actions/types';
import { fetchApi } from '../../api/swapi';
import { storageAPIKey, storageKey } from '../search/storageKeys';

export default async function searchLoader(args: RequestType) {
  console.log(args);

  const { request, params, context } = args;
  console.log('loader', request, params, context);

  const search = localStorage.getItem(storageKey) ?? '';
  const apiendpoint = localStorage.getItem(storageAPIKey) ?? 'people';

  return fetchApi(apiendpoint, search);
}
