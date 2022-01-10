import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./store";
import { FriendType } from "./types";

const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

let initialState = {
    isSidebarOpen: false,
    friendsList: [
        {
          id: 1,
          name: "Dimych"
        },
        {
          id: 2,
          name: "Artem"
        },
        {
          id: 3,
          name: "Nastya"
        },
        {
          id: 4,
          name: "Olga"
        },
        {
          id: 5,
          name: "Lesha Domachuk"
        }
      ] as Array<FriendType>
}

export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
    return {
      ...state,
      isSidebarOpen: typeof(action.payload) === 'boolean' ? action.payload : !state.isSidebarOpen
    }

    default:
       return state;
  }
}

type ActionType = ToggleSidebarActionType;

type ToggleSidebarActionType = {
  type: typeof TOGGLE_SIDEBAR
  payload: boolean
}
export const toggleSidebarAC = (isOpen:boolean):ToggleSidebarActionType => ({
  type: TOGGLE_SIDEBAR,
  payload: isOpen
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const toggleSidebar = (isOpen:boolean): ThunkType => async (dispatch) => {
  dispatch(toggleSidebarAC(isOpen)); 
}

export default sidebarReducer;