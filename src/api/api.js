import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "41bf619d-5f1e-4bc5-8bd8-728246f3affc" 
    }
})

export const usersAPI = {
    endpoint: "users", 
    getUsers ( currentPage = 1, pageSize = 10 ) {
        return instance.get(
            `${this.endpoint}?page=${currentPage}&count=${pageSize}`
          ).then(response => response.data)
    }
}

export const profileAPI = {
    endpoint: 'profile/',
    getProfile ( userID ) {
        return instance.get(
            this.endpoint + userID
          ).then(response => response.data)
    },
    getStatus ( userId ) {
        return instance.get(
            this.endpoint + "status/" + userId
        ).then(response => response.data)
    },
    updateStatus ( status ) {
        return instance.put(this.endpoint + "status/", { status })
    },
    uploadPhoto (photoFile) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(this.endpoint + "photo/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
    },
    saveProfile (profile) {
        return instance.put(this.endpoint, {...profile})
    }
}

export const followAPI =  {
    endpoint: 'follow/',

    follow (id, data = {}) {
        return instance.post(
            this.endpoint + id, data
        ).then(response => response.data)
    },

    unFollow (id) {
        return instance.delete(
            this.endpoint + id
        ).then(response => response.data)
    }
}

export const authAPI = {
    endpoint: 'auth/',

    auth () {
        return instance.get(
            this.endpoint + 'me'
          ).then(response => {
            return response.data
          });
    },

    login (formData) {
        return instance.post(
            this.endpoint + "login", {...formData}
        ).then(response => response.data);
    },

    logout () {
        return instance.delete(
            this.endpoint + "login"
        ).then(response => response.data);
    }
}

export const securityAPI = {
    endpoint: 'security/',

    getCaptcha () {
        return instance.get(this.endpoint + "get-captcha-url");
    }
}