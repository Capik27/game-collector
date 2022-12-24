import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	X_LIMIT,
	Y_LIMIT,
	DETECTOR_HEIGHT,
	ITEM_SIZE,
	GLOBAL_W,
} from "../constants";
import { setCoords } from "../store/coordsSlice";

const size =
	GLOBAL_W > 600 ? (GLOBAL_W > 800 ? (GLOBAL_W > 1000 ? 100 : 80) : 60) : 40;

export function Detector() {
	const dispatch = useDispatch();
	const [x, setX] = useState(X_LIMIT / 2);

	const moveHandler = (event: any) => {
		const cursor_posX = event.clientX;

		if (event.pointerType === "touch" && event.isPrimary) {
			console.log("touch", cursor_posX, event.width);
		}

		if (cursor_posX < size / 2) {
			setX(0);
		} else if (cursor_posX > X_LIMIT + ITEM_SIZE / 2 - size / 2) {
			setX(X_LIMIT + ITEM_SIZE / 2 - size);
		} else {
			setX(cursor_posX - size / 2);
		}
		dispatch(setCoords({ x1: x, x2: x + size }));
	};

	// const addTouchListener = () => {
	// 	window.addEventListener("pointermove", moveHandler);
	// 	// window.addEventListener("pointerup", moveHandler);
	// 	//
	// 	window.removeEventListener("pointerdown", addTouchListener);
	// };

	//MOUSE
	// useEffect(() => {
	// 	window.addEventListener("mousemove", moveHandler);
	// 	return () => window.removeEventListener("mousemove", moveHandler);
	// });

	//TOUCH + MOUSE
	useEffect(() => {
		window.addEventListener("pointermove", moveHandler);
		return () => window.removeEventListener("pointermove", moveHandler);
	});

	return (
		<div
			className="detector"
			style={{ width: size, top: Y_LIMIT + DETECTOR_HEIGHT, left: x }}
		/>
	);
}
