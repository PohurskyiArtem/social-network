import { instance, ResponseType } from "./api"

type FollowResponseType = {
    fieldsErrors: Array<string>
}
export const followAPI =  {
    endpoint: 'follow/',

    follow (id: number, data = {}) {
        return instance.post<ResponseType<FollowResponseType>>(
            this.endpoint + id, data
        ).then(response => response.data)
    },

    unFollow (id: number) {
        return instance.delete(
            this.endpoint + id
        ).then(response => response.data) as Promise<ResponseType>
    }
}