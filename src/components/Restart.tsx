import { useDispatch } from "react-redux";
import { resetStats } from "../store/statsSlice";

export function Restart({ reload }: any) {
	const dispatch = useDispatch();

	const restartHandler = (e: any) => {
		e.preventDefault();
		dispatch(resetStats());
		reload(0);
	};

	return (
		<div className="gameover">
			<button onClick={restartHandler}>Restart</button>
		</div>
	);
}
