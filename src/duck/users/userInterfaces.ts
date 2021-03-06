import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  LOGIN_WITH_GOOGLE,
  CHECK_SESSION,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  CLEAR_USER_ERROR,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAILURE,
  NOT_LOGGED
} from './userTypes';
import { Config } from '../timer/timerReducer';

export interface UserData {
  uid: string;
  email: string;
  config: Config;
  selectedTask: string | 'default';
  tasks: any | null;
  loginProvider: 'password' | 'google.com' | '';
}

export interface RegisterAndLoginParams {
  email: string;
  password: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export interface SignError {
  code: string | null;
  message: string | null;
}

// REGISTER ACTIONS INTERFACES

export interface RegisterStartAction {
  type: typeof REGISTER_START;
  payload: RegisterAndLoginParams;
}
export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: UserData;
}
export interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: SignError;
}

// LOGIN ACTIONS INTERFACES

export interface LoginStartAction {
  type: typeof LOGIN_START;
  payload: RegisterAndLoginParams;
}
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: SignError;
}

// SIGN OUT INTERFACES

export interface SignOutStartAction {
  type: typeof SIGN_OUT_START;
}
export interface SignOutSuccessAction {
  type: typeof SIGN_OUT_SUCCESS;
}
export interface SignOutFailureAction {
  type: typeof SIGN_OUT_FAILURE;
  payload: SignError;
}

// LOGIN WITH GOOGLE INTERFACES

export interface LoginWithGoogleAction {
  type: typeof LOGIN_WITH_GOOGLE;
}

// CHECK SESSION INTERFACE

export interface CheckSessionAction {
  type: typeof CHECK_SESSION;
}

export interface CheckSessionSuccessAction {
  type: typeof CHECK_SESSION_SUCCESS;
  payload: UserData;
}

export interface CheckSessionFailureAction {
  type: typeof CHECK_SESSION_FAILURE;
  payload: SignError;
}

export interface NotLoggedAction {
  type: typeof NOT_LOGGED;
}

// CHANGE PASSWORD INTERFACE

export interface ChangePasswordStartAction {
  type: typeof CHANGE_PASSWORD_START;
  payload: ChangePasswordParams;
}
export interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_SUCCESS;
}
export interface ChangePasswordFailureAction {
  type: typeof CHANGE_PASSWORD_FAILURE;
  payload: SignError;
}

// Delete account

export interface DeleteAccountStartAction {
  type: typeof DELETE_ACCOUNT_START;
  payload: string;
}
export interface DeleteAccountSuccessAction {
  type: typeof DELETE_ACCOUNT_SUCCESS;
}
export interface DeleteAccountFailureAction {
  type: typeof DELETE_ACCOUNT_FAILURE;
  payload: SignError;
}

export interface ClearUserErrorAction {
  type: typeof CLEAR_USER_ERROR;
}

export type UserActionTypes =
  | RegisterStartAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignOutStartAction
  | SignOutSuccessAction
  | SignOutFailureAction
  | LoginWithGoogleAction
  | CheckSessionAction
  | CheckSessionSuccessAction
  | CheckSessionFailureAction
  | NotLoggedAction
  | ChangePasswordStartAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction
  | DeleteAccountStartAction
  | DeleteAccountSuccessAction
  | DeleteAccountFailureAction
  | ClearUserErrorAction;
