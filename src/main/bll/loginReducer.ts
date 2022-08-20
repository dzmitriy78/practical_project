import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";
import {errorHandler} from "./errorHandler";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"
const SET_ERROR = "loginReducer/SET-ERROR"
const SET_IS_LOADING = "loginReducer/SET-IS-LOADING"

export const setAuthUserData = (data: LoginInitialStateType) => ({
    type: SET_USER_DATA,
    payload: {data}
}) as const

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    isInitialized
}) as const
export const setIsLoadingAC = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    isLoading
}) as const


export const setError = (error: string) => ({
    type: SET_ERROR,
    error
}) as const

const loginInitialState: LoginInitialStateType = {
    isAuth: false,
    isLoading: false,
    isInitialized: false,
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
                isInitialized: action.payload.data.isInitialized,
                userData: action.payload.data.userData
            }
        case SET_APP_INITIALIZED:
            return {
                ...state,
                isInitialized: action.isInitialized,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
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

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        const data = await authAPI.me()
        if (data) {
            dispatch(setAuthUserData({isAuth: true, userData: data}))
            dispatch(setAppInitializedAC(true))
        }
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export type LoginInitialStateType = {
    isAuth: boolean
    isLoading?: boolean
    isInitialized?: boolean
    userData: {
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
    error?: string | null
}
type SetUserDataAT = {
    type: typeof SET_USER_DATA,
    payload: AuthPayloadType
}
type SetAppInitializedAT = {
    type: typeof SET_APP_INITIALIZED,
    isInitialized: boolean
}
export type SetErrorType = {
    type: typeof SET_ERROR,
    error: string
}
export type SetIsLoadingAT = {
    type: typeof SET_IS_LOADING,
    isLoading: boolean
}

type AuthActionType = SetUserDataAT | SetAppInitializedAT | SetErrorType | SetIsLoadingAT

type AuthPayloadType = {
    data: LoginInitialStateType
}

type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>