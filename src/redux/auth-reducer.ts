import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { AppStateType, BaseThunkType, InfernActionsTypes } from "./store";

const SET_USER_DATA = "SN/AUTH/SET_USER_DATA",
      SET_CAPTCHA_URL = "SN/AUTH/SET_CAPTCHA_URL";

let initialState = {
  userId: null as null | number,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
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

type ActionType = InfernActionsTypes<typeof actions>;

export const actions = {
  setUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
    ) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth} as const}
  ),
  setCaptchaUrl: (captchaUrl:string | null) => ({type: SET_CAPTCHA_URL, payload: {captchaUrl}} as const)
}

//thunk creators

type ThunkType = BaseThunkType<ActionType>;


export const authMe = (): ThunkAction<Promise<any>, AppStateType, unknown, ActionType> => async (dispatch) => {
  let {resultCode, data} =  await authAPI.auth();
  if(resultCode === ResultCodeEnum.Succes) {
    let { login, id, email } = data;
    dispatch(actions.setUserData( id, email, login, true ));
    return id;
  }   
};

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const login = (formData:FormDataType): ThunkType => async (dispatch) => {
  let {resultCode, messages} = await authAPI.login({...formData});
  if(resultCode === ResultCodeEnum.Succes) {
    dispatch(authMe())
    dispatch(actions.setCaptchaUrl(null))
  } else {
    if(resultCode === ResultCodeEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = messages!.length > 0 && (resultCode === 10 ? "Confirm that you are not a bot" : messages![0]);
    throw message;
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if(response.resultCode === ResultCodeEnum.Succes)  {
    dispatch(actions.setUserData( null, null, null, false ));
    dispatch(authMe())
  };
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const captcha = await securityAPI.getCaptcha();
  dispatch(actions.setCaptchaUrl(captcha.data.url));
};

export default authReducer;