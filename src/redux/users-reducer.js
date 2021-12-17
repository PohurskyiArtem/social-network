import { followAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/functions/updateObjectInArray";

// Action type constants

const FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
  SET_USERS = "SET_USERS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT",
  TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";

// Initial state for Users component 

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

// Redusers

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
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

// Actions creators

export const followSuccess = (userId) => ({
  type: FOLLOW,
  userId,
});

export const unFollowSuccess = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});
export const setTotalUsersCount = (count) => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
});
export const toggleIsFollowing = (isFollowingToggle, userId) => ({
  type: TOGGLE_IS_FOLLOWING,
  isFollowingToggle,
  userId,
});

// Thunks creators

export const requestUsers = (currentPage, pageSize) => async dispatch => {
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
  };


const followUnfollowflow = async (dispatch, id, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowing(true, id));

  let response = await apiMethod(id);
  if (response.resultCode === 0) {
    dispatch(actionCreator(id));
  }

  dispatch(toggleIsFollowing(false, id));
}

export const unFollow = id => dispatch => {
    let apiMethod = followAPI.unFollow.bind(followAPI);
    let actionCreator = unFollowSuccess;
    followUnfollowflow(dispatch, id, apiMethod, actionCreator);    
};

export const follow = id => dispatch => {
    let apiMethod = followAPI.follow.bind(followAPI);
    let actionCreator = followSuccess;
    followUnfollowflow(dispatch, id, apiMethod, actionCreator);    
};
