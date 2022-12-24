import { useDispatch } from "react-redux";
import { calcDetectorW, calcLimitXY } from "../constants";
import { setDetectorWidth, setLimits } from "../store/detectorSlice";
import { resetStats } from "../store/statsSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function Restart({ reload }: any) {
	const dispatch = useDispatch();

	const restartHandler = (e: any) => {
		e.preventDefault();
		dispatch(resetStats());
		dispatch(setLimits(calcLimitXY()));
		dispatch(setDetectorWidth(calcDetectorW()));
		reload(0);
	};

	return (
		<>
			<div className="gameover">
				<button onClick={restartHandler}>Restart</button>
			</div>
			<div className="mask" />
		</>
	);
}
