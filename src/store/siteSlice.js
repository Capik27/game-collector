import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	db: [],
	game: "",
};

const siteSlice = createSlice({
	name: "site",
	initialState,
	reducers: {
		addData(state, action) {
			state.db.push(action.payload);
		},
		setGame(state, action) {
			state.game = action.payload;
		},
	},
});

export default siteSlice.reducer;
export const { addData, setGame } = siteSlice.actions;
