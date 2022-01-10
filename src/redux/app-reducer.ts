import { ThunkAction } from 'redux-thunk';
import { authMe } from "./auth-reducer";
import { getOwnerProfile, getOwnerStatus } from "./profile-reducer";
import { AppStateType } from './store';

const SET_INITIALIZING_APP = "SET_INITIALIZED_APP";

export type InitializeStateType = {
  initialized: boolean
}

let initialState: InitializeStateType = {
  initialized: false
};

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

type ActionType = InitializedSuccessActionType

type InitializedSuccessActionType = {
  type: typeof SET_INITIALIZING_APP
}

export const initializedSuccess = ():InitializedSuccessActionType => ({
  type: SET_INITIALIZING_APP
});

//thunk creators

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const initializeApp = ():ThunkType => async (dispatch) => {
    Promise.all([
      dispatch(authMe())
    ])
      .then(id => {
        if (id[0]) {
          dispatch(getOwnerProfile(id[0]));
          dispatch(getOwnerStatus(id[0]));
        }
        dispatch(initializedSuccess());
      });    
  };

export default appReducer;