import type { AppDispatch } from "@/app/model/store/Store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();