import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import formSlice from "./reducers/formSlice";

const rootReducer = combineReducers({
  userFormData: formSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
