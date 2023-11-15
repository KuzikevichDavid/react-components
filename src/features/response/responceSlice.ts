import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponceType } from '../../api/apiResponseType';

export interface DetailResponse {
  response: ResponceType;
}

const getEmptyResponse = (): DetailResponse => ({
  response: {
    results: [],
    next: null,
    previous: null,
    count: 0,
  },
});

const responceSlice = createSlice({
  name: 'response',
  initialState: getEmptyResponse(),
  reducers: {
    setResponse: {
      reducer: (state, action: PayloadAction<ResponceType>) => {
        state.response = action.payload;
      },
      prepare: (response: ResponceType) => ({ payload: response }),
    },
  },
});

export const { setResponse } = responceSlice.actions;
export default responceSlice.reducer;
