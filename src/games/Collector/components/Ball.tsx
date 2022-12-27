import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_SIZE } from "../../../constants";
import { addPoint, missPoint } from "../../../store/statsSlice";
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

interface BallProps {
	deleteItem: Function;
	id: string; // date
	speed: number; // distance in second
	target: number;
	time: number;
	x: number;
	y: number;
}

const grabDelay: number = 50;
const animDelay: number = 20;
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function Ball(props: BallProps) {
	const dispatch = useDispatch();
	const [destroyed, setDestroyed] = useState(false);
	const { deleteItem, id, target, time, x } = props;
	const detector = useSelector((state: any) => state.detector.coords);

	useEffect(() => {
		const ball = document.getElementById(id);

		function destroyBall() {
			ball?.removeEventListener("transitionend", destroyBall);
			setDestroyed(true);
		}

		if (destroyed) {
			if (isIntersection(detector, x)) {
				dispatch(addPoint());
				const det: any = document.querySelector(".detector");
				det.style.backgroundColor = "black";
				const timer = setTimeout(() => {
					det.style.backgroundColor = "red";
					clearTimeout(timer);
				}, grabDelay);
			} else {
				dispatch(missPoint());
			}
			deleteItem({ id });
		} else {
			const anim_timer = setTimeout(() => {
				if (ball) {
					ball.addEventListener("transitionend", destroyBall);
					ball.style.left = x + "px";
					ball.style.transform = `translateY(${target}px)`;
					ball.style.transitionProperty = `transform`;
					ball.style.transitionDuration = `${time}s`;
					ball.style.transitionTimingFunction = `linear`;
				}
			}, animDelay);

			const timecheck_timer = setTimeout(() => {
				destroyBall();
			}, time * 1000 + animDelay * 2);

			return () => {
				clearTimeout(anim_timer);
				clearTimeout(timecheck_timer);
			};
		}
	}, [destroyed]);

	function isIntersection(detector_pos: any, x: number) {
		const x1_limit = detector_pos.x1 - ITEM_SIZE / 2;
		const x2_limit = detector_pos.x2 + ITEM_SIZE / 2;
		const item_center = x + ITEM_SIZE / 2;
		return item_center >= x1_limit && item_center <= x2_limit;
	}

	return <div className="ball" id={id}></div>;
}
