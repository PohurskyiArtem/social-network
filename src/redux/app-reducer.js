import { authMe } from "./auth-reducer";
import { getOwnerProfile, getOwnerStatus } from "./profile-reducer";

const SET_INITIALIZING_APP = "SET_INITIALIZED_APP";


let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({
  type: SET_INITIALIZING_APP
});

//thunk creators

export const initializeApp = () => (dispatch) => {
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