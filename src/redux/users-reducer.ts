import { Dispatch } from "redux";
import { followAPI } from "../api/follow-api";
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/functions/updateObjectInArray";
import { BaseThunkType, InfernActionsTypes } from "./store";
import { UserType } from "./types";

// Action type constants

const FOLLOW = "SN/USERS/FOLLOW",
  UNFOLLOW = "SN/USERS/UNFOLLOW",
  SET_USERS = "SN/USERS/SET_USERS",
  SET_CURRENT_PAGE = "SN/USERS/SET_CURRENT_PAGE",
  SET_TOTAL_USERS_COUNT = "SN/USERS/SET_TOTAL_USERS_COUNT",
  TOGGLE_IS_FOLLOWING = "SN/USERS/TOGGLE_IS_FOLLOWING";

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

type ActionType = InfernActionsTypes<typeof actions>

// Actions creators

export const actions = {
  followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
  unFollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
  setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
  setCurrentPage: (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const),
  setTotalUsersCount: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const),
  toggleIsFollowing: (isFollowingToggle: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING, isFollowingToggle, userId} as const)
}

// Thunks creators

type ThunkType = BaseThunkType<ActionType>;

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
  dispatch(actions.setCurrentPage(currentPage))
  let response = await usersAPI.getUsers(currentPage, pageSize);
  console.log(response)
  dispatch(actions.setUsers(response.items));
  dispatch(actions.setTotalUsersCount(response.totalCount));
};


const _followUnfollowflow = async (dispatch: Dispatch<ActionType>, id: number, apiMethod: any,
  actionCreator: (id: number) => ActionType) => {
    
  dispatch(actions.toggleIsFollowing(true, id));

  let response = await apiMethod(id);
  if (response.resultCode === 0) {
    dispatch(actionCreator(id));
  }

  dispatch(actions.toggleIsFollowing(false, id));
}

export const unFollow = (id: number): ThunkType => async (dispatch) => {
  let apiMethod = followAPI.unFollow.bind(followAPI);
  let actionCreator = actions.unFollowSuccess;
  _followUnfollowflow(dispatch, id, apiMethod, actionCreator);
};

export const follow = (id: number): ThunkType => async (dispatch) => {
  let apiMethod = followAPI.follow.bind(followAPI);
  let actionCreator = actions.followSuccess;
  _followUnfollowflow(dispatch, id, apiMethod, actionCreator);
};
