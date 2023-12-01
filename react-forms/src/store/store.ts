import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import formSlice from "./reducers/formSlice";

const rootReducer = combineReducers({
  userFormData: formSlice,
});

export const setupStore = (preloadedState?: PreloadedState<AppRootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
