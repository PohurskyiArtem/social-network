import { PhotosType, ProfileType } from "../redux/types"
import { instance, ResponseType } from "./api"

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
        return instance.put<ResponseType>(this.endpoint + "status/", { status })
    },
    uploadPhoto (photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<ResponseType<PhotosType>>(this.endpoint + "photo/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
    },
    saveProfile (profile: ProfileType) {
        return instance.put<ResponseType>(this.endpoint, {...profile})
    }
}