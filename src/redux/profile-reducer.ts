import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ResultCodeEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { BaseThunkType, InfernActionsTypes } from "./store";
import { PhotosType, PostType, ProfileType } from "./types";

const ADD_POST = "SN/PROFILE/ADD_POST",
  SET_USER_PROFILE = "SN/PROFILE/SET_USER_PROFILE",
  TOGGLE_PROFILE_LOADING = "SN/PROFILE/TOGGLE_PROFILE_LOADING",
  SET_USER_STATUS = "SN/PROFILE/SET_USER_STATUS",
  DELETE_POST = "SN/PROFILE/DELETE_POST",
  UPLOAD_PHOTO = "SN/PROFILE/UPLOAD_PHOTO",
  SET_OWNER_PROFILE = "SN/PROFILE/SET_OWNER_PROFILE",
  SET_OWNER_STATUS = "SN/PROFILE/SET_OWNER_STATUS";

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

type ActionType = InfernActionsTypes<typeof actions>

export const actions = {
  addPost: (newPostbody:string, avatar:string) => ({type: ADD_POST, newPostbody, avatar} as const),
  setUserProfile: (profile:ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
  setOwnerProfile: (profile:ProfileType) => ({type: SET_OWNER_PROFILE, profile} as const),
  toggleProfileLoading: (isProfileLoading:boolean) => ({type: TOGGLE_PROFILE_LOADING, isProfileLoading} as const),
  setUserStatus: (status: string) => ({type: SET_USER_STATUS, status} as const),
  setOwnerStatus: (status: string) => ({type: SET_OWNER_STATUS, status} as const),
  deletePost: (id:number) => ({type: DELETE_POST, id} as const),
  uploadPhotoSuccess: (photos:PhotosType) => ({type: UPLOAD_PHOTO, photos} as const)  
}

type ThunkType = BaseThunkType<ActionType>;

export const getProfile = async (dispatch:any, id:number, actionCreator:any) => {
  dispatch(actions.toggleProfileLoading(true));

  let response = await profileAPI.getProfile(id);
  if(response) {
    dispatch(actionCreator(response));

    dispatch(actions.toggleProfileLoading(false));
  }
  
};

const getStatus = async (dispatch:any, id:number, actionCreator:any) => {
  let response = await profileAPI.getStatus(id);
  dispatch(actionCreator(response));
};

// Thunks creators

export const addNewPost = (newPostbody: string, avatar: string) => async (dispatch: Dispatch<ActionType>) => dispatch(actions.addPost(newPostbody, avatar))

export const getUserProfile = (id:number) => async (dispatch: Dispatch<ActionType>) => getProfile(dispatch, id, actions.setUserProfile);

export const getOwnerProfile = (id:number) => async (dispatch: Dispatch<ActionType>) => getProfile(dispatch, id, actions.setOwnerProfile);

export const getUserStatus = (userId:number) => async (dispatch: Dispatch<ActionType>) => getStatus(dispatch, userId, actions.setUserStatus)

export const getOwnerStatus = (userId:number) => async (dispatch: Dispatch<ActionType>) => getStatus(dispatch, userId, actions.setOwnerStatus)

export const updateStatus = (status:string): ThunkType => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === ResultCodeEnum.Succes) {
    dispatch(actions.setOwnerStatus(status));
    toast.success("Status updated");
  } else {
    let message = response.data.messages!.length > 0 ? response.data.messages![0] : "Some error";
    toast.error(message);
    throw new Error();
  }
};

export const uploadPhoto = (photo: File): ThunkType => async (dispatch) => {
  let response = await profileAPI.uploadPhoto(photo);
  if (response.data.resultCode ===  ResultCodeEnum.Succes) {
    dispatch(actions.uploadPhotoSuccess(response.data.data));
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
