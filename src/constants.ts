export const {width:GLOBAL_W,height: GLOBAL_H} = getClientWH()

export function getClientWH(){
    return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
}

export const PERIOD = 40;
export const DETECTOR_HEIGHT: number = 5;
export const ITEM_SIZE: number = 10;
export const Y_START_DEFAULT: number = ITEM_SIZE * -1;

export const Y_LIMIT: number = GLOBAL_H - DETECTOR_HEIGHT * 4;
export const X_LIMIT: number = GLOBAL_W - ITEM_SIZE / 2;

export const SPEED_A: number = 200;
export const SPEED_B: number = 700;

export const GAME_OVER: number = 30;
