import {
  put,
  call,
  all,
  delay,
  take,
  takeLatest,
  race
} from 'redux-saga/effects';
import {
  START_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  SKIP_BREAK,
  SET_TIMERS_START,
  FETCH_INITIAL_STATE_START
} from './timerTypes';
import {
  incIntervalInFirestore,
  saveInitialTimelefts,
  fetchInitialState
} from './timerUtils';
import {
  stopTimerAndSwitchFaze,
  setTimersSuccess,
  setTimersFailure,
  fetchInitialStateSucces,
  fetchInitialStateFailure
} from './timerActions';

export function* startTimerSaga({ isInterval, timeleft, selectedTask }: any) {
  try {
    yield delay(timeleft * 1000 + 1000);
    yield put(stopTimerAndSwitchFaze(isInterval));
    yield isInterval && call(incIntervalInFirestore, selectedTask);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export function* setTimersSaga({ timelefts }: any) {
  try {
    yield call(saveInitialTimelefts, timelefts);
    yield put(setTimersSuccess(timelefts));
  } catch (err) {
    yield put(setTimersFailure(err));
  }
}

export function* fetchInitialStateSaga() {
  try {
    const initialState = yield call(fetchInitialState);
    yield put(fetchInitialStateSucces(initialState));
  } catch (err) {
    yield put(fetchInitialStateFailure(err));
  }
}

export function* onStartTimer() {
  yield takeLatest(START_TIMER, function*(...args) {
    yield race({
      task: call(startTimerSaga, ...args),
      cancel: take([PAUSE_TIMER, RESET_TIMER, SKIP_BREAK])
    });
  });
}

export function* onSettingTimers() {
  yield takeLatest(SET_TIMERS_START, setTimersSaga);
}

export function* onFetchingInitialState() {
  yield takeLatest(FETCH_INITIAL_STATE_START, fetchInitialStateSaga);
}

export function* timerSagas() {
  yield all([
    call(onStartTimer),
    call(onSettingTimers),
    call(onFetchingInitialState)
  ]);
}