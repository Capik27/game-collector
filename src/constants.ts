import { ObjectBindingOrAssignmentPattern } from "typescript";

export function getClientWH(){
    return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const DETECTOR_WIDTH_PERCENT: number = 0.1;
export function calcDetectorW(){
    const {width: W} = getClientWH()
    const presize = Math.ceil(W * DETECTOR_WIDTH_PERCENT);
    return presize % 2 ? presize + 1 : presize;
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const DETECTOR_HEIGHT: number = 5;
export const ITEM_SIZE: number = 10; // Ball size
export const Y_START_DEFAULT: number = ITEM_SIZE * -1;

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function calcLimitXY(){  
    const {width: W,height: H} = getClientWH()
    const X_LIMIT = W - ITEM_SIZE / 2;
    const Y_LIMIT = H - DETECTOR_HEIGHT * 4;
    return {X_LIMIT,Y_LIMIT}
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export function randomInteger(min:number, max:number) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

interface SumAB {
    [index: string]: number;
  }

export function calcSumAB(arr: Array<string>):object{
    const result = {} as SumAB
    arr.forEach(function(i){
        if (result[i] != undefined)
            ++result[i];
        else
            result[i] = 1;
    });
    return result
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

export const COLLECTOR: string = "Collector";
export const THINKER: string = "Thinker";
export const TITLE_COLLECTOR: string = 'Collect falling balls as much as you can. Loss at 30 passes';
export const TITLE_THINKER: string = 'Guess the correct button 5 times, but the machine will try to deceive you';

export const SPEED_A: number = 200;
export const SPEED_B: number = 700;

export const GAME_OVER: number = 30;
