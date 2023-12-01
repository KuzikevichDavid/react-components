import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFormType } from "../schemes/userForm";

export interface UserFormData {
  data: Partial<UserFormType>;
}

const getInit = (): UserFormData => ({
  data: {},
});

const userSlice = createSlice({
  name: "userFormData",
  initialState: getInit(),
  reducers: {
    setUserData: {
      reducer: (state: UserFormData, action: PayloadAction<UserFormType>) => {
        state.data = action.payload;
      },
      prepare: (data: UserFormType) => ({ payload: data }),
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
