import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_SIZE, Y_LIMIT } from "../constants";
import { addPoint, missPoint } from "../store/statsSlice";

interface ItemProps {
	deleteItem: Function;
	id: string; // date
	speed: number; // distance in second
	pos_x: number;
	pos_y: number;
}

const period = 40; // time

export function Item(props: ItemProps) {
	const dispatch = useDispatch();
	const { deleteItem, id, speed, pos_x: x } = props;
	const [y, setY] = useState(props.pos_y);
	const [distance] = useState(speed / period);
	const detector = useSelector((state: any) => state.coords);

	useEffect(() => {
		if (y < Y_LIMIT) {
			const timer = setTimeout(() => {
				setY((prev) => prev + distance);
			}, period);
			return () => clearTimeout(timer);
		} else {
			if (isIntersection(detector, x)) {
				dispatch(addPoint());
				const elem: any = document.querySelector(".detector");
				elem.style.backgroundColor = "black";
				const timer = setTimeout(() => {
					elem.style.backgroundColor = "red";
					clearTimeout(timer);
				}, 50);
			} else {
				dispatch(missPoint());
			}
			deleteItem({ id });
		}
	}, [y, distance, id, deleteItem, dispatch, x, detector]);

	function isIntersection(detector_pos: any, x: number) {
		const x1_limit = detector_pos.x1 - ITEM_SIZE / 2;
		const x2_limit = detector_pos.x2 + ITEM_SIZE / 2;
		const item_center = x + ITEM_SIZE / 2;

		return item_center >= x1_limit && item_center <= x2_limit;
	}

	return (
		<div
			className="item"
			style={{ transform: `translateY(${y}px)`, left: x }}
		></div>
	);
}
