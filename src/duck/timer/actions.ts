import {
  UPDATE_TIMER,
  START_PAUSE_TIMER,
  RESET_RETRY_TIMER,
  SWITCH_FAZE
} from './types';

export const updateTimer = (seconds: number, isInterval: boolean) => {
  let field = isInterval ? 'intervalTime' : 'breakTime';
  return {
    type: UPDATE_TIMER,
    field,
    [field]: seconds
  };
};

export const startPauseTimer = (isTimerStart: boolean) => {
  return {
    type: START_PAUSE_TIMER,
    isTimerStart
  };
};

export const resetRetryTimer = (isTimerStart: boolean) => {
  return {
    type: RESET_RETRY_TIMER,
    isTimerStart
  };
};

export const switchFaze = (isInterval: boolean) => {
  return {
    type: SWITCH_FAZE,
    isInterval
  };
};