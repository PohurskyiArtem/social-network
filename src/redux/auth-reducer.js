import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA",
      SET_CAPTCHA_URL = "samurai-network/auth/SET_CAPTCHA_URL";


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
        
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

//action creators

export const setUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: {captchaUrl}
});


//thunk creators

export const authMe = () => async (dispatch) => {
  let {resultCode, data} =  await authAPI.auth();
  if(resultCode === 0) {
    let { login, id, email } = data;
    dispatch(setUserData( id, email, login, true ));
    return id;
  }   
};

export const login = (formData) => async dispatch => {
  let {resultCode, messages} = await authAPI.login({...formData});
  if(resultCode === 0) {
    dispatch(authMe())
    dispatch(setCaptchaUrl(null))
  } else {
    if(resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = messages.length > 0 && (resultCode === 10 ? "Confirm that you are not a bot" : messages[0]);
    throw message;
  }
};

export const logout = () => async dispatch => {
  let response = await authAPI.logout();
  if(response.resultCode === 0)  {
    dispatch(setUserData( null, null, null, false ));
    dispatch(authMe())
  };
};

export const getCaptchaUrl = () => async dispatch => {
  const response = await securityAPI.getCaptcha();
  dispatch(setCaptchaUrl(response.data.url));
};




export default authReducer;