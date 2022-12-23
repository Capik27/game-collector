import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Ball } from "./components/Ball";
import {
	ITEM_SIZE,
	X_LIMIT,
	Y_LIMIT,
	Y_START_DEFAULT,
	SPEED_A,
	SPEED_B,
} from "./constants";

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function App() {
	const { winrate } = useSelector((state) => state.stats);
	const [count, setCount] = useState(0);
	const [items, setItems] = useState([]);

	function deleteItem(deleted) {
		// console.log("ITEMs", items);
		setItems((prev) => prev.filter((item) => item.id !== deleted.id));
	}

	function createBall() {
		const id = randomInteger(1, 1000) + "-" + new Date().toISOString();
		const lowSpeed = SPEED_A + count > SPEED_B ? SPEED_B : SPEED_A + count;
		const speed = randomInteger(lowSpeed, SPEED_B);
		const target = Y_LIMIT + Math.abs(Y_START_DEFAULT);
		const x = randomInteger(ITEM_SIZE / 2, X_LIMIT);
		const time = target / speed;

		return { id, speed, target, time, x };
	}

	useEffect(() => {
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
		</>
	);
}

export default App;
