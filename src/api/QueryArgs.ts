import { PagedResponseType, ResponceType } from './apiResponseType';
import { BaseQueryApi, BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { fetchPaged, fetchApi } from './swapi';

interface QueryArgs {
  page?: number;
  itemsPerPage?: number;
  endpoint: string;
  search?: string;
}

enum QueryEndpoints {
  fetchPaged = 'getPaged',
  fetchApi = 'getByName'
}

const customBaseQuery: BaseQueryFn = async (args: QueryArgs, api: BaseQueryApi) => {
  try {
    const state = api.getState() as RootState;
    switch (api.endpoint) {
      case QueryEndpoints.fetchPaged:
        return { data: await fetchPaged(args.endpoint, args.page, args.itemsPerPage || state.search.perPage, args.search || state.search.searchText) };
      case QueryEndpoints.fetchApi:
        return { data: await fetchApi(args.endpoint, args.search || state.search.searchText) };
      default:
        return { error: { status: 500, statusText: 'Internal Server Error', data: "wrong dispatch endpoint" } };
    }
  } catch (error) {
    return { error };
  }
};

export const swApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'swapi',
  tagTypes: [],
  endpoints: (builder) => ({
    [QueryEndpoints.fetchPaged]: builder.query<PagedResponseType, QueryArgs>({ query: (args: QueryArgs) => args }),
    [QueryEndpoints.fetchApi]: builder.query<ResponceType, QueryArgs>({ query: (args: QueryArgs) => args, keepUnusedDataFor: 360 }),
  }),
});

export const { getByName, getPaged } = swApi.endpoints;
