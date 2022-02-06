import { UserType } from "../redux/types"
import { instance } from "./api"

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