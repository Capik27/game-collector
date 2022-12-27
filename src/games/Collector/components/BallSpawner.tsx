import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ball } from "./Ball";
import { Restart } from "./Restart";
import {
	ITEM_SIZE,
	Y_START_DEFAULT,
	SPEED_A,
	SPEED_B,
	GAME_OVER,
	randomInteger,
} from "../../../constants";

export function BallSpawner() {
	const { X_LIMIT, Y_LIMIT } = useSelector(
		(state: any) => state.detector.limits
	);
	const { winrate, missed } = useSelector((state: any) => state.stats);
	const [count, setCount] = useState(0);
	const [items, setItems] = useState([]);

	function deleteItem(deleted: any) {
		setItems((prev) => prev.filter((item: any) => item.id !== deleted.id));
	}

	function createBall() {
		const id = randomInteger(1, 1000) + "-" + new Date().toISOString();
		const lowSpeed = SPEED_A + count > SPEED_B ? SPEED_B : SPEED_A + count;
		const highSpeed =
			SPEED_B - (SPEED_A + (count > SPEED_A ? SPEED_A : count) * -1);
		const speed = randomInteger(lowSpeed, highSpeed);
		const target = Y_LIMIT + Math.abs(Y_START_DEFAULT);
		const x = randomInteger(ITEM_SIZE / 2, X_LIMIT);
		const time = target / speed;

		return { id, speed, target, time, x };
	}

	useEffect(() => {
		if (missed < GAME_OVER) {
			const timer = setTimeout(() => {
				const max_count =
					winrate > 70 ? (winrate > 80 ? (winrate > 90 ? 6 : 5) : 4) : 3;
				const item_count = randomInteger(1, max_count);
				for (let i = 0; i < item_count; i++) {
					const ball = createBall();
					setItems((prev) => {
						const newState: any = [
							...prev,
							{
								id: ball.id,
								speed: ball.speed,
								target: ball.target,
								time: ball.time,
								x: ball.x,
							},
						];
						return newState;
					});
				}
				setCount((prev) => prev + item_count);
			}, randomInteger(1, 3) * 1000);
			return () => clearTimeout(timer);
		} else {
			setItems([]);
		}
	}, [count]);

	return (
		<>
			{items.map((item: any) => (
				<Ball
					key={item.id}
					id={item.id}
					speed={item.speed}
					target={item.target}
					time={item.time}
					x={item.x}
					y={Y_START_DEFAULT}
					deleteItem={deleteItem}
				/>
			))}
			{missed >= GAME_OVER && <Restart reload={setCount} />}
		</>
	);
}
