import { RequestType } from '../../actions/types';
import { defaultPerPage, fetchPaged } from '../../api/swapi';
import { starageItemsPerPageKey, storageAPIKey, storageKey } from '../search/storageKeys';

export default async function searchLoader(args: RequestType) {
  console.log(args);

  const { request, params, context } = args;
  console.log('loader', request, params, context);

  const search = localStorage.getItem(storageKey) ?? '';
  const apiEndpoint = localStorage.getItem(storageAPIKey) ?? 'people';
  const perPage = localStorage.getItem(starageItemsPerPageKey) ?? defaultPerPage;
  const page = params.page ? +params.page : 1;

  return fetchPaged(apiEndpoint, page, +perPage, search);
}
