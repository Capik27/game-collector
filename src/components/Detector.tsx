import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DETECTOR_HEIGHT, ITEM_SIZE } from "../constants";
import { setCoords } from "../store/detectorSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function Detector() {
	const dispatch = useDispatch();
	const size = useSelector((state: any) => state.detector.width);
	const { X_LIMIT, Y_LIMIT } = useSelector(
		(state: any) => state.detector.limits
	);
	const [x, setX] = useState(X_LIMIT / 2);

	const moveHandler = (event: any) => {
		const cursor_posX = event.clientX;

		// if (event.pointerType === "touch" && event.isPrimary) {
		// 	// console.log("touch", cursor_posX, event.width);
		// }

		if (cursor_posX < size / 2) {
			setX(0);
		} else if (cursor_posX > X_LIMIT + ITEM_SIZE / 2 - size / 2) {
			setX(X_LIMIT + ITEM_SIZE / 2 - size);
		} else {
			setX(cursor_posX - size / 2);
		}
		dispatch(setCoords({ x1: x, x2: x + size }));
	};

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
