import axios from "axios";

export enum ResultCodeEnum {    
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    messages?: Array<string>,
    resultCode: RC
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "41bf619d-5f1e-4bc5-8bd8-728246f3affc" 
    }
})