import { useEffect, useState } from "react";

interface ItemProps {
	deleteItem: Function;
	id: string; // date
	speed: number; // distance in second
	pos_x: number;
	pos_y: number;
}

const period = 40; // time
const y_limit = document.documentElement.clientHeight - 10;

export function Item(props: ItemProps) {
	const { deleteItem, id, speed, pos_x: x } = props;
	const [y, setY] = useState(props.pos_y);
	const [distance] = useState(speed / period);

	useEffect(() => {
		if (y < y_limit) {
			const timer = setTimeout(() => {
				setY((prev) => prev + distance);
			}, period);
			return () => clearTimeout(timer);
		} else {
			deleteItem({ id });
		}
	}, [y, distance, id]);

	return <div id={id} className="item" style={{ top: y, left: x }}></div>;
}
