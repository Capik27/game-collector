import { useDispatch } from "react-redux";
import { addData, setGame } from "../../../store/siteSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

interface ThinkerReProps {
	changeResult: Function;
	reload: Function;
	result: string;
}

export function Restart({ changeResult, reload, result }: ThinkerReProps) {
	const dispatch = useDispatch();

	const restartHandler = () => {
		dispatch(addData(result));
		changeResult("");
		reload(false);
	};

	const exitHandler = () => {
		dispatch(setGame(""));
		restartHandler();
	};

	return (
		<>
			<div className="gameover">
				<button className="btn" onClick={restartHandler}>
					Restart
				</button>
				<button className="btn" onClick={exitHandler}>
					Exit
				</button>
			</div>
			<div className="mask" />
		</>
	);
}
