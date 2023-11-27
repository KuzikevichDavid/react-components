import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingFlags {
  isFirstLoading: boolean;
  mainSectionIsLoading: boolean;
  detailSectionIsLoading: boolean;
}

const initState = (): LoadingFlags => ({
  isFirstLoading: true,
  mainSectionIsLoading: false,
  detailSectionIsLoading: false,
});

const setMain = (state: LoadingFlags, action: PayloadAction<boolean>) => {
  state.mainSectionIsLoading = action.payload;
  if (state.isFirstLoading && !action.payload) {
    state.isFirstLoading = false;
  }
};

const setDetail = (state: LoadingFlags, action: PayloadAction<boolean>) => {
  state.detailSectionIsLoading = action.payload;
};

const setFlag = () => ({ payload: true });

const removeFlag = () => ({ payload: false });

const loadingFlagSlice = createSlice({
  name: 'loadingFlags',
  initialState: initState(),
  reducers: {
    mainSectionStartLoading: {
      reducer: setMain,
      prepare: setFlag,
    },
    mainSectionEndLoading: {
      reducer: setMain,
      prepare: removeFlag,
    },
    detailSectionStartLoading: {
      reducer: setDetail,
      prepare: setFlag,
    },
    detailSectionEndLoading: {
      reducer: setDetail,
      prepare: removeFlag,
    },
  },
});

export const {
  mainSectionStartLoading,
  mainSectionEndLoading,
  detailSectionEndLoading,
  detailSectionStartLoading,
} = loadingFlagSlice.actions;
export default loadingFlagSlice.reducer;
