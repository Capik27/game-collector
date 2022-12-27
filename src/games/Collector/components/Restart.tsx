import { useDispatch } from "react-redux";
import { calcDetectorW, calcLimitXY } from "../../../constants";
import { setDetectorWidth, setLimits } from "../../../store/detectorSlice";
import { setGame } from "../../../store/siteSlice";
import { resetStats } from "../../../store/statsSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function Restart({ reload }: any) {
	const dispatch = useDispatch();

	const restartHandler = () => {
		dispatch(resetStats());
		dispatch(setLimits(calcLimitXY()));
		dispatch(setDetectorWidth(calcDetectorW()));
		reload(0);
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
