import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultPerPage } from '../../../api/swapi';
import { storageKey, storageAPIKey, storageItemsPerPageKey } from './storageKeys';

export interface Search {
  searchText: string;
  endpoint: string;
  perPage: number;
}

const isDefined = typeof window !== 'undefined';

const initState = (): Search => {
  return {
    searchText: isDefined ? localStorage.getItem(storageKey) ?? '' : '',
    endpoint: isDefined ? localStorage.getItem(storageAPIKey) ?? 'people' : 'people',
    perPage: isDefined
      ? +(localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage)
      : defaultPerPage,
  };
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initState(),
  reducers: {
    setSearch: {
      reducer: (state, action: PayloadAction<string>) => {
        if (isDefined) localStorage.setItem(storageKey, action.payload);
        state.searchText = action.payload;
      },
      prepare: (searchText: string) => ({ payload: searchText }),
    },
    setEndpoint: {
      reducer: (state, action: PayloadAction<string>) => {
        if (isDefined) localStorage.setItem(storageAPIKey, action.payload);
        state.endpoint = action.payload;
      },
      prepare: (endpoint: string) => ({ payload: endpoint }),
    },
    setItemsPerPage: {
      reducer: (state, action: PayloadAction<number>) => {
        if (isDefined) localStorage.setItem(storageItemsPerPageKey, action.payload.toString());
        state.perPage = action.payload;
      },
      prepare: (perPage: number) => ({ payload: perPage }),
    },
  },
});

export const { setSearch, setEndpoint, setItemsPerPage } = searchSlice.actions;
export default searchSlice.reducer;
