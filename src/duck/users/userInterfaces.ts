import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './userTypes';

export interface UserData {
  uid: string;
  email: string;
}

export interface RegisterAndLoginParams {
  email: string;
  password: string;
}

export interface SignError {
  code: string;
  message: string;
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

export type UserActionTypes =
  | RegisterStartAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction;
