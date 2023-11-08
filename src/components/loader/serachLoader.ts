import { Context, useContext } from 'react';
import { RequestType } from '../../actions/types';
import { defaultPerPage, fetchPaged } from '../../api/swapi';
import { SearchContextType } from '../../contexts/SearchContext';
import { storageItemsPerPageKey, storageAPIKey, storageKey } from '../search/storageKeys';

export default async function searchLoader({ params, context }: RequestType) {
  console.log('context');
  console.log(context);

  console.log(params);

  const search = localStorage.getItem(storageKey) ?? '';
  const apiEndpoint = params.endpoint ? params.endpoint : 'people';
  const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;
  const page = params.page ? +params.page : 1;

  return fetchPaged(apiEndpoint, page, +perPage, search);
}


// function searchLoader(context: Context<SearchContextType>) {
//   return async function ({ params }: RequestType) {
//     // const {  } = context;
//     const { endpoint: [apiEndpoint,], search: [search,], perPage: [perPage,] } = useContext(context)
//     const page = params.page ? +params.page : 1;
//     return fetchPaged(apiEndpoint, page, perPage, search);
//   }
// }
// export { searchLoader as default }