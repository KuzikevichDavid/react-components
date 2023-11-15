import { RequestType } from '../../actions/types';
import { defaultPerPage, fetchPaged } from '../../api/swapi';
import { storageItemsPerPageKey, storageKey } from '../../features/search/storageKeys';

export default async function searchLoader({ params }: RequestType) {
  const search = localStorage.getItem(storageKey) ?? '';
  const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;

  return fetchPaged(params.endpoint, +params.page, +perPage, search);
}
