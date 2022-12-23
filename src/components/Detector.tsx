import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { X_LIMIT, Y_LIMIT, DETECTOR_HEIGHT, ITEM_SIZE } from "../constants";
import { setCoords } from "../store/coordsSlice";

interface DetectorSize {
	size: number;
}

export function Detector({ size }: DetectorSize) {
	const dispatch = useDispatch();
	const [x, setX] = useState(X_LIMIT / 2);

	const mouseMoveHandler = (event: any) => {
		const cursor_posX = event.clientX;

		if (cursor_posX < size / 2) {
			setX(0);
		} else if (cursor_posX > X_LIMIT + ITEM_SIZE / 2 - size / 2) {
			setX(X_LIMIT + ITEM_SIZE / 2 - size);
		} else {
			setX(cursor_posX - size / 2);
		}
		dispatch(setCoords({ x1: x, x2: x + size }));
	};

	useEffect(() => {
		window.addEventListener("mousemove", mouseMoveHandler);
		return () => window.removeEventListener("mousemove", mouseMoveHandler);
	});

	return (
		<div
			className="detector"
			style={{ width: size, top: Y_LIMIT + DETECTOR_HEIGHT, left: x }}
		/>
	);
}
