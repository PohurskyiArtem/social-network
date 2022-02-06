import { FormDataType } from "../redux/auth-reducer";
import { instance, ResponseType } from "./api";

type MeResponseType = {
    login: string,
    id: number,
    email: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    endpoint: 'auth/',

    auth () {
        return instance.get<ResponseType<MeResponseType>>(
            this.endpoint + 'me'
          ).then(response => {
            return response.data
          });
    },

    login (formData: FormDataType) {
        return instance.post<ResponseType<LoginResponseDataType>>(
            this.endpoint + "login", {...formData}
        ).then(response => response.data);
    },

    logout () {
        return instance.delete(
            this.endpoint + "login"
        ).then(response => response.data);
    }
}