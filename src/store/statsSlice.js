import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	collected: 0,
	missed: 0,
	total: 0,
	winrate: "",
};

const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		addPoint(state) {
			state.collected = state.collected + 1;
			state.total = state.collected + state.missed;
			state.winrate = ((state.collected / state.total) * 100).toFixed(0);
		},
		missPoint(state) {
			state.missed = state.missed + 1;
			state.total = state.collected + state.missed;
			state.winrate = ((state.collected / state.total) * 100).toFixed(0);
		},
		updateTotal(state) {
			state.total = state.collected + state.missed;
		},
		updateWinrate(state) {
			state.winrate = ((state.collected / state.total) * 100).toFixed(0);
		},
	},
});

export default statsSlice.reducer;
export const { addPoint, missPoint } = statsSlice.actions;
