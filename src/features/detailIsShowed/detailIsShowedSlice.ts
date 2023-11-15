import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DetailIsShowed {
  isShowed: boolean;
}

const initState = (): DetailIsShowed => ({ isShowed: false });

const detailIsShowedSlice = createSlice({
  name: 'detailClose',
  initialState: initState(),
  reducers: {
    closeDetail: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.isShowed = action.payload;
      },
      prepare: () => ({ payload: false }),
    },
    openDetail: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.isShowed = action.payload;
      },
      prepare: () => ({ payload: true }),
    },
  },
});

export const { closeDetail, openDetail } = detailIsShowedSlice.actions;
export default detailIsShowedSlice.reducer;
