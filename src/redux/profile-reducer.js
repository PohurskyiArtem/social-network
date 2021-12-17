import { toast } from "react-toastify";
import { profileAPI } from "../api/api";

const ADD_POST = "PROFILE_PAGE__ADD_POST",
  SET_USER_PROFILE = "PROFILE_PAGE__SET_USER_PROFILE",
  TOGGLE_PROFILE_LOADING = "PROFILE_PAGE__TOGGLE_PROFILE_LOADING",
  SET_USER_STATUS = "PROFILE_PAGE__SET_USER_STATUS",
  DELETE_POST = "PROFILE_PAGE__DELETE_POST",
  UPLOAD_PHOTO = "PROFILE_PAGE__UPLOAD_PHOTO",
  SET_OWNER_PROFILE = "SET_OWNER_PROFILE",
  SET_OWNER_STATUS = "SET_OWNER_STATUS";

let initialState = {
  postsData: [
    //test values
    {
      id: 1,
      postText: "Hello? How are you?",
    },
    {
      id: 2,
      postText: "London is the capital of Great Britain, did you know?",
    },
    {
      id: 3,
      postText: "Kak menya vse zaebalo, hochu obratno domoy v Japan",
    },
  ],
  profile: null,
  ownerProfile: null,
  profileIsLoading: false,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          {
            id: state.postsData.length  + 1,
            postText: action.newPostbody,
            image: action.avatar,
          },
          ...state.postsData
        ],
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_OWNER_PROFILE:
      return {
        ...state,
        ownerProfile: {...state.ownerProfile, ...action.profile},
      };

    case TOGGLE_PROFILE_LOADING:
      return {
        ...state,
        profileIsLoading: action.isProfileLoading,
      };

    case SET_USER_STATUS:
      return {
        ...state,
        profile: {...state.profile, status: action.status}
      };

    case SET_OWNER_STATUS:
    return {
      ...state,
      ownerProfile: {...state.ownerProfile, status: action.status}
    };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.id),
      };

    case UPLOAD_PHOTO:
      return {
        ...state,
        ownerProfile: { ...state.ownerProfile, photos: {...action.photos} },
      };

    default:
      return state;
  }
};

export default profileReducer;

// Action creators

export const addPost = (avatar, newPostbody) => ({
  type: ADD_POST,
  avatar,
  newPostbody,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setOwnerProfile = (profile) => ({
  type: SET_OWNER_PROFILE,
  profile,
});
export const toggleProfileLoading = (isProfileLoading) => ({
  type: TOGGLE_PROFILE_LOADING,
  isProfileLoading,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const setOwnerStatus = (status) => ({
  type: SET_OWNER_STATUS,
  status,
});
export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});
export const uploadPhotoSuccess = (photos) => ({
  type: UPLOAD_PHOTO,
  photos,
});

export const getProfile = async (dispatch, id, actionCreator) => {
  dispatch(toggleProfileLoading(true));

  let response = await profileAPI.getProfile(id);
  dispatch(actionCreator(response));

  dispatch(toggleProfileLoading(false));
};

const getStatus = async (dispatch, id, actionCreator) => {
  let response = await profileAPI.getStatus(id);
  dispatch(actionCreator(response));
};

// Thunks creators

export const getUserProfile = (id) => (dispatch) => getProfile(dispatch, id, setUserProfile);

export const getOwnerProfile = (id) => (dispatch) => getProfile(dispatch, id, setOwnerProfile);

export const getUserStatus = (userId) => async (dispatch) => getStatus(dispatch, userId, setUserStatus)

export const getOwnerStatus = (userId) => async (dispatch) => getStatus(dispatch, userId, setOwnerStatus)

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setOwnerStatus(status));
    toast.success("Status updated");
  } else {
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    toast.error(message);
    throw new Error();
  }
};

export const uploadPhoto = (photo) => async (dispatch) => {
  let response = await profileAPI.uploadPhoto(photo);
  if (response.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(response.data.data.photos));
    toast.success("Photo updated");
  } else {
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    toast.error(message);
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let { data } = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getOwnerProfile(userId));
    toast.success("Profile updated");
  } else {
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    throw message;
  }
};
