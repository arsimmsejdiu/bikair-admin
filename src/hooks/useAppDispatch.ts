// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { useDispatch } from "react-redux";

import { AppDispatch } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
