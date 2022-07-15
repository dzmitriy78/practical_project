import axios from "axios"

const settings = {
    withCredentials: true
}

const instance = axios.create({
   baseURL: 'http://localhost:7542/2.0/',
    ...settings
})

export const authAPI = {
    me() {
        return  instance.post<loginResponseType>('auth/me');
    },
    login(data: LoginParamsType) {
        return  instance.post<loginResponseType>('auth/login', data);
    },
    logout() {
        return instance.delete<{info: string}>('auth/me');
    },
}



export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type loginResponseType = {
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
    token: string
    tokenDeathTime: number
    avatar: string
    error?: string
    in?: string
}