import { useState } from "react";
import { useDispatch } from "react-redux";
import { choiseType } from "../Thinker";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const CLASS_ENABLED: string = "choice__item_enabled";
const CLASS_DISABLED: string = "choice__item_disabled";
const CLASS_CHOICE: string = "choice";
const CLASS_FADE: string = "fadeBTN";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

interface ChoiceProps {
	setIsLoss: Function;
	updateResult: Function;
	value: choiseType;
}

export function Choice({ setIsLoss, updateResult, value }: ChoiceProps) {
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();

	// DISABLED
	function changeBoxAndBtnClassToDisabled() {
		const BTN_A = document.getElementById("A");
		const BTN_B = document.getElementById("B");
		BTN_A?.classList.remove(CLASS_ENABLED);
		BTN_B?.classList.remove(CLASS_ENABLED);
		BTN_A?.classList.add(CLASS_DISABLED);
		BTN_B?.classList.add(CLASS_DISABLED);
	}
	// DEFAULT
	function changeBoxAndBtnClassToDefault() {
		const BTN_A = document.getElementById("A");
		const BTN_B = document.getElementById("B");
		BTN_A?.classList.remove(CLASS_DISABLED);
		BTN_B?.classList.remove(CLASS_DISABLED);
		BTN_A?.classList.add(CLASS_ENABLED);
		BTN_B?.classList.add(CLASS_ENABLED);
		setDisabled(false);
	}
	// LOSS FADE
	function toggleBoxClass(remove: boolean, animName: string) {
		const BOX = document.querySelector("." + CLASS_CHOICE);
		if (remove) {
			BOX?.classList.remove(animName);
		} else {
			BOX?.classList.toggle(animName);
		}
	}

	const selectHandler = (e: any) => {
		setDisabled(true);
		const BUTTON = e.target;
		const SELECTED = BUTTON.id;

		changeBoxAndBtnClassToDisabled();

		const time: number = 1000;
		const colorClass: string = SELECTED === value ? "green" : "red";

		if (SELECTED != value) toggleBoxClass(false, CLASS_FADE);
		BUTTON.classList.add(colorClass);

		const timer = setTimeout(() => {
			if (SELECTED != value) setIsLoss(true);
			updateResult((prev: string) => prev + SELECTED);
			BUTTON.classList.remove(colorClass);
			changeBoxAndBtnClassToDefault();
			toggleBoxClass(true, CLASS_FADE);
			clearTimeout(timer);
		}, time);
	};

	return (
		<>
			<div className="choice">
				<button
					id={"A"}
					disabled={disabled}
					className={"choice__item " + CLASS_ENABLED}
					onClick={selectHandler}
				>
					A
				</button>
				<button
					id={"B"}
					disabled={disabled}
					className={"choice__item " + CLASS_ENABLED}
					onClick={selectHandler}
				>
					B
				</button>
			</div>
		</>
	);
}
