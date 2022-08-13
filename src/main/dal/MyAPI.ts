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
        return instance.post<loginResponseType>('auth/me');
    },
    login(data: LoginParamsType) {
        return instance.post<loginResponseType>('auth/login', data);
    },
    logout() {
        return instance.delete<{ info: string }>('auth/me');
    },
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
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