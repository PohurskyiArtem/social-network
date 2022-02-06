import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { AppStateType } from "./store";
import { PhotosType, PostType, ProfileType } from "./types";

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
  ] as Array<PostType>,
  profile: null as null | ProfileType,
  ownerProfile: null as null | ProfileType,
  profileIsLoading: false,
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action:ActionType):InitialStateType => {
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
        profile: action.profile as ProfileType,
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
        profile: {...state.profile, status: action.status} as ProfileType
      };

    case SET_OWNER_STATUS:
    return {
      ...state,
      ownerProfile: {...state.ownerProfile, status: action.status} as ProfileType
    };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.id),
      };

    case UPLOAD_PHOTO:
      return {
        ...state,
        ownerProfile: { ...state.ownerProfile, photos: {...action.photos} } as ProfileType,
      };

    default:
      return state;
  }
};

export default profileReducer;

// Action creators

type ActionType = AddPostActionType | SetUserProfileActionType | SetOwnerProfileActionType | 
 ToggleProfileLoadingActionType | SetUserStatusActionType | SetOwnerStatusActionType | DeletePostActionType | UploadPhotoSuccessActionType

type AddPostActionType = {
  type: typeof ADD_POST
  avatar: string
  newPostbody: string
}
export const addPost = (newPostbody:string, avatar:string):AddPostActionType => ({
  type: ADD_POST,
  newPostbody,
  avatar
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  }
};

type SetOwnerProfileActionType = {
  type: typeof SET_OWNER_PROFILE
  profile: ProfileType
}
export const setOwnerProfile = (profile:ProfileType):SetOwnerProfileActionType => ({
  type: SET_OWNER_PROFILE,
  profile,
});

type ToggleProfileLoadingActionType = {
  type: typeof TOGGLE_PROFILE_LOADING
  isProfileLoading: boolean
}
export const toggleProfileLoading = (isProfileLoading:boolean):ToggleProfileLoadingActionType => ({
  type: TOGGLE_PROFILE_LOADING,
  isProfileLoading,
});

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS,
  status: string
}
export const setUserStatus = (status: string):SetUserStatusActionType => ({
  type: SET_USER_STATUS,
  status,
});

type SetOwnerStatusActionType = {
  type: typeof SET_OWNER_STATUS,
  status: string
}
export const setOwnerStatus = (status: string):SetOwnerStatusActionType => ({
  type: SET_OWNER_STATUS,
  status,
});

type DeletePostActionType = {
  type: typeof DELETE_POST
  id: number
}
export const deletePost = (id:number):DeletePostActionType => ({
  type: DELETE_POST,
  id,
});

type UploadPhotoSuccessActionType = {
  type: typeof UPLOAD_PHOTO,
  photos: PhotosType
}
export const uploadPhotoSuccess = (photos:PhotosType):UploadPhotoSuccessActionType => ({
  type: UPLOAD_PHOTO,
  photos,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>;

export const getProfile = async (dispatch:any, id:number, actionCreator:any) => {
  dispatch(toggleProfileLoading(true));

  let response = await profileAPI.getProfile(id);
  if(response) {
    dispatch(actionCreator(response));

    dispatch(toggleProfileLoading(false));
  }
  
};

const getStatus = async (dispatch:any, id:number, actionCreator:any) => {
  let response = await profileAPI.getStatus(id);
  dispatch(actionCreator(response));
};

// Thunks creators

export const addNewPost = (newPostbody: string, avatar: string) => async (dispatch: Dispatch<ActionType>) => dispatch(addPost(newPostbody, avatar))

export const getUserProfile = (id:number) => async (dispatch: Dispatch<ActionType>) => getProfile(dispatch, id, setUserProfile);

export const getOwnerProfile = (id:number) => async (dispatch: Dispatch<ActionType>) => getProfile(dispatch, id, setOwnerProfile);

export const getUserStatus = (userId:number) => async (dispatch: Dispatch<ActionType>) => getStatus(dispatch, userId, setUserStatus)

export const getOwnerStatus = (userId:number) => async (dispatch: Dispatch<ActionType>) => getStatus(dispatch, userId, setOwnerStatus)

export const updateStatus = (status:string): ThunkType => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === ResultCodeEnum.Succes) {
    dispatch(setOwnerStatus(status));
    toast.success("Status updated");
  } else {
    let message = response.data.messages!.length > 0 ? response.data.messages![0] : "Some error";
    toast.error(message);
    throw new Error();
  }
};

export const uploadPhoto = (photo:any): ThunkType => async (dispatch) => {
  let response = await profileAPI.uploadPhoto(photo);
  if (response.data.resultCode ===  ResultCodeEnum.Succes) {
    dispatch(uploadPhotoSuccess(response.data.data));
    toast.success("Photo updated");
  } else {
    let message = response.data.messages!.length > 0 ? response.data.messages![0] : "Some error";
    toast.error(message);
  }
};

export const saveProfile = (profile:ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let { data } = await profileAPI.saveProfile(profile);
  if (data.resultCode ===  ResultCodeEnum.Succes) {
    if(userId !== null) dispatch(getOwnerProfile(userId));
    toast.success("Profile updated");
  } else {
    let message = data.messages!.length > 0 ? data.messages![0] : "Some error";
    throw message;
  }
};
