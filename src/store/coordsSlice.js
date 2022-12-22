import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	x1: 0,
	x2: 0,
};

const coordsSlice = createSlice({
	name: "coords",
	initialState,
	reducers: {
		setCoords(state, action) {
			state.x1 = action.payload.x1;
			state.x2 = action.payload.x2;
		},
	},
});

export default coordsSlice.reducer;
export const { setCoords } = coordsSlice.actions;
