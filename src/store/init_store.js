import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coordsSlice from "./coordsSlice";
import statsSlice from "./statsSlice";

const rootReducer = combineReducers({
	coords: coordsSlice,
	stats: statsSlice,
});

export const store = configureStore({ reducer: rootReducer });
