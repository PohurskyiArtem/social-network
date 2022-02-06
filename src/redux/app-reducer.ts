import { authMe } from "./auth-reducer";
import { getOwnerProfile, getOwnerStatus } from "./profile-reducer";
import { BaseThunkType, InfernActionsTypes } from './store';

const SET_INITIALIZING_APP = "SN/APP/SET_INITIALIZED_APP";

let initialState = {
  initialized: false
};

export type InitializeStateType = typeof initialState

const appReducer = (state: InitializeStateType = initialState, action: ActionType): InitializeStateType => {
  switch (action.type) {
    case SET_INITIALIZING_APP:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
};

//action creators

type ActionType = InfernActionsTypes<typeof actions>

export const actions = {
  initializedSuccess: () => ({type: SET_INITIALIZING_APP})
}

//thunk creators

type ThunkType = BaseThunkType<ActionType>;

export const initializeApp = ():ThunkType => async (dispatch) => {
    Promise.all([
      dispatch(authMe())
    ])
      .then(id => {
        if (id[0]) {
          dispatch(getOwnerProfile(id[0]));
          dispatch(getOwnerStatus(id[0]));
        }
        dispatch(actions.initializedSuccess());
      });    
  };

export default appReducer;