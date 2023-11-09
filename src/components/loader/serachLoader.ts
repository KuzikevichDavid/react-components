import { RequestType } from '../../actions/types';
import { defaultPerPage, fetchPaged } from '../../api/swapi';
import { storageItemsPerPageKey, storageKey } from '../search/storageKeys';

export default async function searchLoader({ params }: RequestType) {
  console.log('Loader', params);

  const search = localStorage.getItem(storageKey) ?? '';
  const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;

  return fetchPaged(params.endpoint, +params.page, +perPage, search);
}
