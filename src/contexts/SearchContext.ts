import { createContext, Dispatch, SetStateAction } from 'react';
import { PagedResponseType } from '../api/apiResponseType';
import { defaultPerPage } from '../api/swapi';
import {
  storageKey,
  storageAPIKey,
  storageItemsPerPageKey,
} from '../components/search/storageKeys';

type State<S> = [S, Dispatch<SetStateAction<S>>];

export interface SearchContextType {
  endpoint: State<string>;
  search: State<string>;
  perPage: State<number>;
  response: State<PagedResponseType>;
}

const search = localStorage.getItem(storageKey) ?? '';
const endpoint = localStorage.getItem(storageAPIKey) ?? 'people';
const perPage = +(localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage);

export const getEmptyResponse = () => ({
  results: [],
  itemsPerPage: perPage,
  page: 1,
  pageCount: 1,
});

export const contextInitValue: SearchContextType = {
  endpoint: [endpoint, () => {}],
  search: [search, () => {}],
  perPage: [perPage, () => {}],
  response: [getEmptyResponse(), () => {}],
};

const SearchContext = createContext<SearchContextType>(contextInitValue);

export default SearchContext;
