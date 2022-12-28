import { useState } from "react";
import { useSelector } from "react-redux";
import { calcSumAB, randomInteger } from "../../constants";
import { Choice } from "./components/Choice";
import { Restart } from "./components/Restart";
import "./index.css";

export type choiseType = "A" | "B";

export function Thinker() {
	const [isLoss, setIsLoss] = useState(false);
	const [result, setResult] = useState("");
	const db = useSelector((state: any) => state.site.db);

	function swapAB(s: choiseType): choiseType {
		return s === "A" ? "B" : "A";
	}

	// LOGIC
	function generateNextVar() {
		if (db.length === 0) return randomInteger(0, 1) ? "A" : "B";
		//
		const index = result.length;

		const changedDB = db.filter((str: string) => index < str.length);

		const prelastChoice =
			changedDB.length >= 2
				? changedDB[changedDB.length - 2][index]
				: undefined;
		const lastChoice =
			changedDB.length >= 1
				? changedDB[changedDB.length - 1][index]
				: undefined;

		const isReverse = prelastChoice
			? lastChoice === prelastChoice
				? false
				: true
			: undefined;
		// console.log("changedDB", changedDB);
		console.log("lastChoice", lastChoice, "prelast", prelastChoice);
		console.log("isReverse", isReverse);
		const rangedDB: any = calcSumAB(changedDB.map((str: string) => str[index]));
		if (rangedDB.A == undefined) rangedDB.A = 0;
		if (rangedDB.B == undefined) rangedDB.B = 0;

		// if (rangedDB.A === rangedDB.B) {
		// 	const res = randomInteger(0, 1) ? "A" : "B";
		// 	return isReverse ? swapAB(res) : res;
		// }

		const total: number = rangedDB.A + rangedDB.B;
		const percentA: number = +((total ? rangedDB.A / total : 0) * 100).toFixed(
			0
		);

		console.log(rangedDB, percentA + "% = А");

		const res = randomInteger(0, 1) ? "A" : "B";
		if (percentA === 100 || percentA === 0) return res;

		const chance = randomInteger(1, 100);
		console.log("chance", chance + "%");
		if (percentA > 50) {
			return chance <= percentA ? "B" : "A";
		} else if (percentA < 50) {
			return chance > percentA ? "A" : "B";
		} else {
			if (rangedDB.A === 0 && rangedDB.B === 0) return res;
			return res;
		}
	}

	const VARIANT = generateNextVar();

	return (
		<>
			{!isLoss && (
				<>
					<Choice
						setIsLoss={setIsLoss}
						updateResult={setResult}
						value={VARIANT}
					/>

					<div className="db_stats">
						{db.length > 0 &&
							db.map((data: string, index: number) => (
								<div key={index}>
									<span>
										{index + 1}
										{") "}
										{data.split("").join("-")}
									</span>
									{index + 1 === db.length && result && (
										<span>
											{index + 2}
											{") "}
											{result.split("").join("-")}
										</span>
									)}
								</div>
							))}
						{!db.length && result && (
							<span>
								{"1) "}
								{result.split("").join("-")}
							</span>
						)}
					</div>
				</>
			)}
			{isLoss && (
				<Restart changeResult={setResult} reload={setIsLoss} result={result} />
			)}
		</>
	);
}
