import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    VALIDATION_FAIL,
    SET_MESSAGE,
  } from "./types";
  import AuthService from "../services/auth.service";

  export const signup = (firstName, lastName, contact, email, password, password2) => (dispatch) => {
      return AuthService.signup(firstName, lastName, contact, email, password, password2).then(
          (data) => {
              // validation error
              console.log(data);
              if (data.validation_error) {
                console.log(data.validation_error);
                for (var error = 0; error < data.validation_error.length; error++) {
                  error = data.validation_error[error]['param'];
                  console.log(error);
                  var message = 'Check your ';
                  var keyword = '';
                  switch(error) {
                    case 'id':
                      keyword = 'Email addresses!';
                      break;
                    case 'pw':
                      keyword = 'Password!';
                      break;
                    case 'pw2':
                      keyword = 'Confirmed Password!';
                      break;
                    case 'contact':
                      keyword = 'Contact number!';
                      break;
                    case 'firstName':
                      keyword = 'First Name!';
                      break;
                    case 'lastName':
                      keyword = 'Last Name!';
                      break;
                  }

                  message = message.concat(keyword);

                  dispatch({
                    type: VALIDATION_FAIL,
                  });
                  dispatch({
                      type: SET_MESSAGE,
                      payload: message,
                  });
    
                  return Promise.reject();

                }
              }

              // signup failed: user exists
              if (data.signup_error) {
                console.log('signup error');
                const message = 'Signup failed! User is already exists.';

                dispatch({
                  type: REGISTER_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
              }

              // password failed
              if (data.password_error) {
                const message = 'Password is not matched';

                dispatch({
                  type: REGISTER_FAIL,
                });
                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
              }

              // signup success
              dispatch({
                type: REGISTER_SUCCESS,
                payload: { user: data },
              });
              dispatch({
                  type: SET_MESSAGE,
                  payload: data.data.message,
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
        if (data.validation_error) {
          for (var error = 0; error < data.validation_error.length; error++) {
            error = data.validation_error[error]['param']
            var message = 'Check your ';
            var keyword = '';
            switch(error) {
              case 'id':
                keyword = 'email addresses!';
                break;
              case 'pw':
                keyword = 'password!';
                break;
            }

            message = message.concat(keyword);

            dispatch({
              type: VALIDATION_FAIL,
            });
        
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
            
            return Promise.reject();
          }
        }

        if (data.login_error){
          const message = 'Login Failed! Please login again.';

          dispatch({
            type: LOGIN_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
      
          return Promise.reject();
        }

        // login success
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
        
      },
      (error) => {
        const message = 'Something went wrong!';

        console.log('login failed')
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