import {
  LOGIN_FALURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
} from "./Constants";

export const LoginStart = () => ({
  type: LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = () => ({
  type: LOGIN_FALURE,
});

export const UpdateStart = () => ({
  type: UPDATE_START,
});

export const UpdateSuccess = (user) => ({
  type: UPDATE_SUCCESS,
  payload: user,
});

export const UpdateFailure = () => ({
  type: UPDATE_FAILURE,
});

export const Logout = () => ({
  type: LOGOUT,
});
