import { all, call } from 'redux-saga/effects';
import { statsSagas } from './stats/statsSagas';
import { taskSagas } from './tasks/taskSagas';
import { userSagas } from './users/userSagas';
import { timerSagas } from './timer/timerSagas';
import { menuSagas } from './menu/menuSagas';

export default function* rootSaga() {
  yield all([
    call(statsSagas),
    call(taskSagas),
    call(userSagas),
    call(timerSagas),
    call(menuSagas)
  ]);
}
