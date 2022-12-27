import { configureStore, combineReducers } from "@reduxjs/toolkit";
import detectorSlice from "./detectorSlice";
import siteSlice from "./siteSlice";
import statsSlice from "./statsSlice";

const rootReducer = combineReducers({
	detector: detectorSlice,
	stats: statsSlice,
	site: siteSlice,
});

export const store = configureStore({ reducer: rootReducer });