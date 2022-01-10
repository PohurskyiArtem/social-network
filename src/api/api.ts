import { PhotosType, ProfileType, UserType } from './../redux/types';
import axios from "axios";
import { FormDataType } from '../redux/auth-reducer';

export enum ResultCodeEnum {    
    Succes = 0,
    Error = 1
}
export enum CaptchaResultCodeEnum {
    CaptchaIsRequired = 10
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "41bf619d-5f1e-4bc5-8bd8-728246f3affc" 
    }
})

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export const usersAPI = {
    endpoint: "users", 
    getUsers ( currentPage = 1, pageSize = 10 ) {
        return instance.get<UsersResponseType>(
            `${this.endpoint}?page=${currentPage}&count=${pageSize}`
          ).then(response => response.data)
    }
}

type UpdateProfileAPIResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type UploadPhotoResponseType = {
    data: PhotosType
    messages: Array<string>
    resultCode: ResultCodeEnum
}
export const profileAPI = {
    endpoint: 'profile/',
    getProfile ( userID: number ) {
        return instance.get<ProfileType>(
            this.endpoint + userID
          ).then(response => response.data)
    },
    getStatus ( userId: number ) {
        return instance.get<string>(
            this.endpoint + "status/" + userId
        ).then(response => {
            return response.data
        })
    },
    updateStatus ( status: string ) {
        return instance.put<UpdateProfileAPIResponseType>(this.endpoint + "status/", { status })
    },
    uploadPhoto (photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<UploadPhotoResponseType>(this.endpoint + "photo/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
    },
    saveProfile (profile: ProfileType) {
        return instance.put<UpdateProfileAPIResponseType>(this.endpoint, {...profile})
    }
}

type FollowResponseType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: ResultCodeEnum
}
export const followAPI =  {
    endpoint: 'follow/',

    follow (id: number, data = {}) {
        return instance.post<FollowResponseType>(
            this.endpoint + id, data
        ).then(response => response.data)
    },

    unFollow (id: number) {
        return instance.delete<FollowResponseType>(
            this.endpoint + id
        ).then(response => response.data)
    }
}

type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodeEnum,
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    },
    resultCode: CaptchaResultCodeEnum | ResultCodeEnum,
    messages: Array<string>
}
export const authAPI = {
    endpoint: 'auth/',

    auth () {
        return instance.get<MeResponseType>(
            this.endpoint + 'me'
          ).then(response => {
            return response.data
          });
    },

    login (formData: FormDataType) {
        return instance.post<LoginResponseType>(
            this.endpoint + "login", {...formData}
        ).then(response => response.data);
    },

    logout () {
        return instance.delete(
            this.endpoint + "login"
        ).then(response => response.data);
    }
}

type CaptchaType = {
    data: {
        url: string
    }
}
export const securityAPI = {
    endpoint: 'security/',

    getCaptcha () {
        return instance.get<CaptchaType>(this.endpoint + "get-captcha-url").then(response => response.data)
    }
}