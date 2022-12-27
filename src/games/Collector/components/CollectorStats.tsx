import { useSelector } from "react-redux";

export function CollectorStats() {
	const { collected, missed, total, winrate } = useSelector(
		(state: any) => state.stats
	);
	return (
		<div className="stats">
			<span>Collected: {collected}</span>
			<span>Missed: {missed}</span>
			<span>Total: {total}</span>
			<span>Winrate: {winrate}%</span>
		</div>
	);
}
