import {
  UPDATE_TIMER,
  START_PAUSE_TIMER,
  RESET_RETRY_TIMER,
  SWITCH_FAZE
} from './types';

interface Timer {
  seconds: number;
  isTimerStart: boolean;
  isInterval: boolean;
}

const initialState: Timer = {
  seconds: 2,
  isTimerStart: false,
  isInterval: true
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_TIMER:
      return {
        ...state,
        seconds: action.seconds
      };
    case START_PAUSE_TIMER:
      return {
        ...state,
        isTimerStart: !action.isTimerStart
      };
    case RESET_RETRY_TIMER:
      return {
        ...state,
        isTimerStart: action.isTimerStart,
        seconds: initialState.seconds
      };
    case SWITCH_FAZE:
      return {
        ...state,
        isInterval: !action.isInterval,
        seconds: initialState.seconds
      };
    default:
      return state;
  }
};
