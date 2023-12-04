import { createSlice } from "@reduxjs/toolkit";
import { countries, SelectItem } from "../schemes/userForm";

export interface Countries {
  data: SelectItem[];
}

const getInit = (): Countries => ({
  data: countries,
});

const countrySlice = createSlice({
  name: "userFormData",
  initialState: getInit(),
  reducers: {},
});

export default countrySlice.reducer;
