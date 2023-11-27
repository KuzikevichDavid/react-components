import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PagedResponseType } from '../../../api/apiResponseType';
import { defaultPerPage } from '../../../api/swapi';

export interface PagedResponse {
  response: PagedResponseType;
}

const getEmptyResponse = (): PagedResponse => ({
  response: {
    results: [],
    itemsPerPage: defaultPerPage,
    page: 1,
    pageCount: 1,
  },
});

const pagedResponceSlice = createSlice({
  name: 'pagedResponse',
  initialState: getEmptyResponse(),
  reducers: {
    setPagedResponse: {
      reducer: (state, action: PayloadAction<PagedResponseType>) => {
        state.response = action.payload;
      },
      prepare: (response: PagedResponseType) => ({ payload: response }),
    },
  },
});

export const { setPagedResponse } = pagedResponceSlice.actions;
export default pagedResponceSlice.reducer;
