import { useEffect, useState } from "react";
import "./App.css";
import { Item } from "./components/Item";

const x_limit = document.documentElement.clientWidth - 10;
const Y_default = -10;

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

function App() {
	const [count, setCount] = useState(0);
	const [items, setItems] = useState([]);

	function deleteItem(deleted) {
		// console.log("ITEMs", items);
		setItems((prev) => prev.filter((item) => item.id !== deleted.id));
		// console.log("DELETE ITEM", deleted.id, items);
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			const item_count = randomInteger(1, 3);
			for (let i = 0; i < item_count; i++) {
				const id = new Date().toISOString() + i;
				setItems((prev) => [
					...prev,
					{
						id,
						speed: randomInteger(200, 600),
						pos_x: randomInteger(5, x_limit),
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
				<Item
					key={item.id}
					id={item.id}
					speed={item.speed}
					pos_x={item.pos_x}
					pos_y={Y_default}
					deleteItem={deleteItem}
				/>
			))}
		</>
	);
}

export default App;
