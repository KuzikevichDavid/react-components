import { BaseQueryApi, BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { PagedResponseType, ResponceType } from '../../api/apiResponseType';
import { RootState } from '../RootState';
import { fetchPaged, fetchApi } from '../../api/swapi';
import {
  detailSectionEndLoading,
  detailSectionStartLoading,
  mainSectionEndLoading,
  mainSectionStartLoading,
} from '../reducers/loadingFlag/loadingFlagSlice';

interface QueryArgs {
  page?: number;
  itemsPerPage?: number;
  endpoint: string;
  search?: string;
}

enum QueryEndpoints {
  FetchPaged = 'getPaged',
  FetchApi = 'getByName',
}

const customBaseQuery: BaseQueryFn = async (args: QueryArgs, api: BaseQueryApi) => {
  try {
    const state = api.getState() as RootState;
    switch (api.endpoint) {
      case QueryEndpoints.FetchPaged:
        api.dispatch(mainSectionStartLoading());
        return {
          data: await fetchPaged(
            args.endpoint,
            args.page,
            args.itemsPerPage ?? state.search.perPage,
            args.search ?? state.search.searchText
          ),
        };
      case QueryEndpoints.FetchApi:
        api.dispatch(detailSectionStartLoading());
        return { data: await fetchApi(args.endpoint, args.search ?? state.search.searchText) };
      default:
        return {
          error: {
            status: 500,
            statusText: 'Internal Server Error',
            data: 'wrong dispatch endpoint',
          },
        };
    }
  } catch (error) {
    return { error };
  } finally {
    api.dispatch(detailSectionEndLoading());
    api.dispatch(mainSectionEndLoading());
  }
};

export const swApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'swapi',
  tagTypes: [],
  endpoints: (builder) => ({
    [QueryEndpoints.FetchPaged]: builder.query<PagedResponseType, QueryArgs>({
      query: (args: QueryArgs) => args,
      keepUnusedDataFor: 360,
    }),
    [QueryEndpoints.FetchApi]: builder.query<ResponceType, QueryArgs>({
      query: (args: QueryArgs) => args,
      keepUnusedDataFor: 360,
    }),
  }),
});

export const { getByName, getPaged } = swApi.endpoints;
