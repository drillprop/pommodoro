import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  deleteAccountSuccess,
  deleteAccountFailure,
  checkSessionSuccess,
  checkSessionFailure,
  notLogged,
} from './userActions';
import {
  LOGIN_START,
  REGISTER_START,
  SIGN_OUT_START,
  CHECK_SESSION,
  LOGIN_WITH_GOOGLE,
  CHANGE_PASSWORD_START,
  DELETE_ACCOUNT_START,
} from './userTypes';
import { auth } from '../../utils/firebase/firebase';
import { getCurrentUser, loginWithGoogle } from '../../utils/firebase/auth';
import {
  RegisterStartAction,
  LoginStartAction,
  ChangePasswordStartAction,
  DeleteAccountStartAction,
} from './userInterfaces';
import {
  addUserToDB,
  getConfigAndTasks,
  changePasswordFirebase,
  deleteAuthUser,
} from './userUtils';
import { ReduxState } from '../store';
import { createNotification } from '../menu/menuActions';

const selectConfig = ({ timer }: ReduxState) => timer.config;
const selectTasks = ({ tasks }: ReduxState) => tasks.tasks;

export function* fetchUserInfo(user: any) {
  yield call(addUserToDB, user.uid, user.email);
  const userSettings = yield call(getConfigAndTasks, user.uid);
  const { email, uid } = user;
  const { tasks, selectedTask, config } = userSettings;
  const configIfNull = yield select(selectConfig);
  const tasksIfNull = yield select(selectTasks);
  return {
    email,
    uid,
    tasks: tasks || tasksIfNull,
    selectedTask,
    config: config || configIfNull,
    loginProvider: user.providerData[0].providerId,
  };
}

// Register

export function* onRegisterWithEmailStart() {
  yield takeLatest(REGISTER_START, registerWithEmail);
}

export function* registerWithEmail({ payload }: RegisterStartAction) {
  try {
    const { email, password } = payload;
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield call(addUserToDB, user.uid, user.email);
    const config = yield select(selectConfig);
    const tasks = yield select(selectTasks);
    if (user) {
      yield put(
        registerSuccess({
          uid: user.uid,
          email: user.email,
          selectedTask: 'default',
          tasks,
          config,
          loginProvider: user.providerData[0].providerId,
        })
      );
    }
  } catch (error) {
    console.log(error);
    yield put(registerFailure(error));
  }
}

// Login

export function* onLoginWithEmailStart() {
  yield takeLatest(LOGIN_START, loginWithEmail);
}

export function* loginWithEmail({ payload }: LoginStartAction) {
  try {
    const { email, password } = payload;
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userInfo = yield call(fetchUserInfo, user);
    yield put(loginSuccess(userInfo));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// Google Login

export function* onLoginGoogleStart() {
  yield takeLatest(LOGIN_WITH_GOOGLE, loginGoogle);
}

export function* loginGoogle() {
  try {
    const { user } = yield loginWithGoogle();
    const userInfo = yield call(fetchUserInfo, user);
    yield put(loginSuccess(userInfo));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// Sign Out

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    yield put(createNotification('Successfully sign out'));
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// Check Session

export function* onCheckSession() {
  yield takeLatest(CHECK_SESSION, checkSession);
}

export function* checkSession() {
  const user = yield call(getCurrentUser);
  try {
    if (!user) {
      yield put(notLogged());
    } else {
      const userInfo = yield call(fetchUserInfo, user);
      yield put(checkSessionSuccess(userInfo));
    }
  } catch (error) {
    yield put(checkSessionFailure(error));
  }
}

// Change Password

export function* onChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_START, changePassword);
}

export function* changePassword({ payload }: ChangePasswordStartAction) {
  try {
    yield call(
      changePasswordFirebase,
      payload.oldPassword,
      payload.newPassword
    );
    yield put(changePasswordSuccess());
    yield put(createNotification('Successfully change password'));
  } catch (error) {
    yield put(changePasswordFailure(error));
  }
}

// Delete Account

export function* onDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT_START, deleteAccount);
}

export function* deleteAccount({ payload }: DeleteAccountStartAction) {
  try {
    yield call(deleteAuthUser, payload);
    yield put(deleteAccountSuccess());
    yield put(signOutSuccess());
    yield put(createNotification('Successfully deleted account'));
  } catch (error) {
    yield put(deleteAccountFailure(error));
  }
}

export function* userSagas() {
  yield all([
    call(onRegisterWithEmailStart),
    call(onLoginWithEmailStart),
    call(onLoginGoogleStart),
    call(onSignOutStart),
    call(onCheckSession),
    call(onChangePassword),
    call(onDeleteAccount),
  ]);
}
