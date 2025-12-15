import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Hook para usar dispatch con tipos
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook para usar selector con tipos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
