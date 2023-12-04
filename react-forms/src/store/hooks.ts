import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppRootState, AppDispatch } from "./store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
