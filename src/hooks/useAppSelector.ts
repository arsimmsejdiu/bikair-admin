// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
