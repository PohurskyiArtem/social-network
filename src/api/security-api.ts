import { instance } from "./api"

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