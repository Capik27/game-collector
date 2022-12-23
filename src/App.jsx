import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Ball } from "./components/Ball";
import { Restart } from "./components/Restart";
import {
	ITEM_SIZE,
	X_LIMIT,
	Y_LIMIT,
	Y_START_DEFAULT,
	SPEED_A,
	SPEED_B,
	GAME_OVER,
	GLOBAL_H,
} from "./constants";

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function App() {
	const { winrate, missed } = useSelector((state) => state.stats);
	const [count, setCount] = useState(0);
	const [items, setItems] = useState([]);

	function deleteItem(deleted) {
		// console.log("ITEMs", items);
		setItems((prev) => prev.filter((item) => item.id !== deleted.id));
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
					setItems((prev) => [
						...prev,
						{
							id: ball.id,
							speed: ball.speed,
							target: ball.target,
							time: ball.time,
							x: ball.x,
						},
					]);
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
			{items.map((item) => (
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

export default App;
