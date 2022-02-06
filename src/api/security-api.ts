import { instance, ResponseType } from "./api"

type CaptchaType = {url: string}
export const securityAPI = {
    endpoint: 'security/',

    getCaptcha () {
        return instance.get<ResponseType<CaptchaType>>(this.endpoint + "get-captcha-url").then(response => response.data)
    }
}