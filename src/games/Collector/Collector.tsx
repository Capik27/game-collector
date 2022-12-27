import { BallSpawner } from "./components/BallSpawner";
import { Detector } from "./components/Detector";
import { CollectorStats } from "./components/CollectorStats";
import "./index.css";

export function Collector() {
	return (
		<>
			<BallSpawner />
			<Detector />
			<CollectorStats />
		</>
	);
}
