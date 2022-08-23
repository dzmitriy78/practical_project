import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"
const SET_ERROR = "loginReducer/SET-ERROR"

export const setAuthUserData = (data: LoginInitialStateType) => ({
    type: SET_USER_DATA,
    payload: {data}
}) as const


export const setError = (error: string) => ({
    type: SET_ERROR,
    error
}) as const

const loginInitialState: LoginInitialStateType = {
    isAuth: false,
    userData: {
        avatar: "",
        created: "",
        email: "",
        isAdmin: false,
        name: "",
        publicCardPacksCount: 0,
        rememberMe: false,
        token: "",
        tokenDeathTime: 0,
        updated: "",
        verified: false,
        __v: 0,
        _id: ""
    },
    error: null
}

const loginReducer = (state = loginInitialState, action: AuthActionType): LoginInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: action.payload.data.isAuth,
                userData: action.payload.data.userData
            }

        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default: {
            return state
        }
    }
}
export default loginReducer;

export const authMe = (): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        const data = await authAPI.me()
        if (data) {
            dispatch(setAuthUserData({isAuth: true, userData: data}))
        }
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        await authAPI.login(data)
        await dispatch(authMe())
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export const logoutTC = (): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        await authAPI.logout()
        dispatch(setAuthUserData({
            isAuth: false,
            userData: {
                avatar: "",
                created: "",
                email: "",
                isAdmin: false,
                name: "",
                publicCardPacksCount: 0,
                rememberMe: false,
                token: "",
                tokenDeathTime: 0,
                updated: "",
                verified: false,
                __v: 0,
                _id: ""
            }
        }))
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export type LoginInitialStateType = {
    isAuth: boolean
    userData: UserDataType
    error?: string | null
}

export type UserDataType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v?: number
    _id?: string
}

type SetUserDataAT = {
    type: typeof SET_USER_DATA,
    payload: AuthPayloadType
}

export type SetErrorType = {
    type: typeof SET_ERROR,
    error: string
}


type AuthActionType = SetUserDataAT | SetErrorType | SetIsLoadingAT

type AuthPayloadType = {
    data: LoginInitialStateType
}

type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>