import { createSlice } from "@reduxjs/toolkit";
import { calcDetectorW, calcLimitXY } from "../constants";

const initialState = {
	coords: { x1: 0, x2: 0 },
	width: calcDetectorW(),
	limits: calcLimitXY(),
};

const detectorSlice = createSlice({
	name: "detector",
	initialState,
	reducers: {
		setCoords(state, action) {
			state.coords.x1 = action.payload.x1;
			state.coords.x2 = action.payload.x2;
		},
		setDetectorWidth(state, action) {
			state.width = action.payload;
		},
		setLimits(state, action) {
			state.limits = action.payload;
		},
	},
});

export default detectorSlice.reducer;
export const { setCoords, setDetectorWidth, setLimits } = detectorSlice.actions;
