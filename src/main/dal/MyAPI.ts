import axios from "axios"

const settings = {
    withCredentials: true
}
const backendUrl = {
    local: 'http://localhost:7542/2.0/',
    heroku: 'https://neko-back.herokuapp.com/2.0/'
}
const instance = axios.create({
    baseURL: backendUrl.heroku,
    ...settings
})

export const authAPI = {
    me() {
        return instance.post<loginResponseType>('auth/me', {})
            .then(res => res.data)
            .catch(errorsAPIHandler)
    },
    login(data: LoginParamsType) {
        return instance.post<loginResponseType>('auth/login', data)
            .then(res => res.data)
            .catch(errorsAPIHandler)
    },
    logout() {
        return instance.delete<{ info: string }>('auth/me', {})
            .then(res => res.data)
            .catch(errorsAPIHandler)
    }
}

export const registerAPI = {
    register(data: RegisterParamsType) {
        return instance.post<RegisterResponseType>("auth/register", data)

    },
    updateUser(name: string, avatar: string) {
        return instance.put<UpdatedUserType>('auth/me', {name, avatar})
            .then(res => res.data)
            .catch(errorsAPIHandler)
    },
    forgot(email: string) {
        return instance.post<ForgotResponseType>("auth/forgot", {
            email, from: "test", message: `<div style="background-color: lime; padding: 15px"> 
password recovery link:<a href='http://localhost:3000/setNewPassword/$token$'>link</a></div>`
        })
            .then(res => res.data)
            .catch(errorsAPIHandler)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<setNewPasswordResponseType>("auth/set-new-password", {password, resetPasswordToken})

    }
}

const errorsAPIHandler = (error: any) => {
    if (error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния, который
        // выходит за пределы 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // Запрос был сделан, но ответ не получен
        // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        console.log(error.request);
    } else {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type RegisterParamsType = {
    email: string
    password: string
}

export type loginResponseType = {
    avatar: string,
    created: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    tokenDeathTime: number,
    updated: string,
    verified: boolean,
    __v?: number,
    _id?: string
    error?: string
    in?: string
}

export type RegisterResponseType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
    }
}

export type UpdatedUserType = {
    updatedUser: {
        _id?: string,
        email?: string,
        rememberMe?: boolean,
        isAdmin?: boolean,
        name: string,
        verified?: boolean,
        publicCardPacksCount?: number,
        created?: string,
        updated?: string,
        __v?: number,
        token?: string,
        tokenDeathTime?: number,
        avatar: string
    },
    token?: string,
    tokenDeathTime?: number
}

export type ForgotResponseType = {
    info: string
    error: string
}
export type setNewPasswordResponseType = {
    info: string
    error: string
}