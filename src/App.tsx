import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
	COLLECTOR,
	THINKER,
	TITLE_COLLECTOR,
	TITLE_THINKER,
} from "./constants";
import { Collector } from "./games/Collector/Collector";
import { Thinker } from "./games/Thinker/Thinker";
import { setGame } from "./store/siteSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function App() {
	const dispatch = useDispatch();
	const game = useSelector((state: any) => state.site.game);

	const handleClick = (name: string) => {
		dispatch(setGame(name));
	};

	return (
		<>
			{!game && (
				<>
					<h2>Сhoose a game</h2>

					<button
						className="btn"
						onClick={() => handleClick(COLLECTOR)}
						title={TITLE_COLLECTOR}
					>
						{COLLECTOR}
					</button>
					<button
						className="btn"
						onClick={() => handleClick(THINKER)}
						title={TITLE_THINKER}
					>
						{THINKER}
					</button>
				</>
			)}
			{game === COLLECTOR && <Collector />}
			{game === THINKER && <Thinker />}
		</>
	);
}

export default App;
