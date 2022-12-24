import { configureStore, combineReducers } from "@reduxjs/toolkit";
import detectorSlice from "./detectorSlice";
import statsSlice from "./statsSlice";

const rootReducer = combineReducers({
	detector: detectorSlice,
	stats: statsSlice,
});

export const store = configureStore({ reducer: rootReducer });