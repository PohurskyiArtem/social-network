import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { followAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/functions/updateObjectInArray";
import { AppStateType } from "./store";
import { UserType } from "./types";

// Action type constants

const FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
  SET_USERS = "SET_USERS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT",
  TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";

// Initial state for Users component 

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10, //size of page for pagination
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
};

export type InitialStateType = typeof initialState;

// Redusers

export const usersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
      };

    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };

    case TOGGLE_IS_FOLLOWING:
      return {
        ...state,
        followingInProgress: action.isFollowingToggle
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export default usersReducer;

type ActionType = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType |
  SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFollowingActionType

// Actions creators

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});

type UnFollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  pageNumber: number
}
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
});

type ToggleIsFollowingActionType = {
  type: typeof TOGGLE_IS_FOLLOWING
  isFollowingToggle: boolean
  userId: number
}
export const toggleIsFollowing = (isFollowingToggle: boolean, userId: number): ToggleIsFollowingActionType => ({
  type: TOGGLE_IS_FOLLOWING,
  isFollowingToggle,
  userId,
});

// Thunks creators

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
  let response = await usersAPI.getUsers(currentPage, pageSize);
  console.log(response)
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
};


const _followUnfollowflow = async (dispatch: Dispatch<ActionType>, id: number, apiMethod: any,
  actionCreator: (id: number) => FollowSuccessActionType | UnFollowSuccessActionType) => {
    
  dispatch(toggleIsFollowing(true, id));

  let response = await apiMethod(id);
  if (response.resultCode === 0) {
    dispatch(actionCreator(id));
  }

  dispatch(toggleIsFollowing(false, id));
}

export const unFollow = (id: number): ThunkType => async (dispatch) => {
  let apiMethod = followAPI.unFollow.bind(followAPI);
  let actionCreator = unFollowSuccess;
  _followUnfollowflow(dispatch, id, apiMethod, actionCreator);
};

export const follow = (id: number): ThunkType => async (dispatch) => {
  let apiMethod = followAPI.follow.bind(followAPI);
  let actionCreator = followSuccess;
  _followUnfollowflow(dispatch, id, apiMethod, actionCreator);
};
