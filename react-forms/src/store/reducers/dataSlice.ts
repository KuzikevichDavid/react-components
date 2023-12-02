import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFormType } from "../schemes/userForm";

export type UserDataType = {
    password: string;
} & Omit<UserFormType, 'password'>

export interface UserData {
    data: Partial<UserDataType>;
}

const getInit = (): UserData => ({
    data: {},
});

const dataSlice = createSlice({
    name: "userData",
    initialState: getInit(),
    reducers: {
        setUserData: {
            reducer: (state: UserData, action: PayloadAction<UserDataType>) => {
                state.data = action.payload;
            },
            prepare: (data: UserDataType) => ({ payload: data }),
        },
    },
});

export const { setUserData } = dataSlice.actions;

export default dataSlice.reducer;