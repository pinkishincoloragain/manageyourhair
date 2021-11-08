import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  import AuthService from "../services/auth.service";

  export const signup = (firstName, lastName, contact, email, password) => (dispatch) => {
      return AuthService.signup(firstName, lastName, contact, email, password).then(
          (response) => {
              dispatch({
                  type: REGISTER_SUCCESS,
              });
              dispatch({
                  type: SET_MESSAGE,
                  payload: response.data.message,
              });

              return Promise.resolve();
          },
          (error) => {
              const error_message = error.response && error.response.data;
              dispatch({
                  type: REGISTER_FAIL,
              });
              dispatch({
                  type: SET_MESSAGE,
                  payload: error_message,
              });
              
              return Promise.reject();
          }
      )
  };
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };