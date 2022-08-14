import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";
import {errorHandler} from "./errorHandler";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"
const SET_ERROR = "loginReducer/SET-ERROR"

export const setAuthUserData = (data: LoginInitialStateType) => ({
    type: SET_USER_DATA,
    payload: {data}
}) as const

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    payload: {isInitialized}
}) as const

export const setError = (error: string) => ({
    type: SET_ERROR,
    payload: {error}
}) as const

const loginInitialState: LoginInitialStateType = {
    isAuth: false,
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
                isInitialized: action.payload.isInitialized,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default: {
            return state
        }
    }
}
export default loginReducer;

export const authMe = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.me()
        if (data) {
            dispatch(setAuthUserData({isAuth: true, userData: data}))
        }
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    //dispatch(setAppStatusAC({status:'loading'}))
    try {
        await authAPI.login(data)
        await dispatch(authMe())
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export const logoutTC = (): ThunkType => async (dispatch) => {

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
    }
}

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.me()
        if (data) {
            dispatch(setAuthUserData({isAuth: true, userData: data}))
            dispatch(setAppInitializedAC(true))
        }
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export type LoginInitialStateType = {
    isAuth: boolean
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
    payload: AppInitializedType
}
export type SetErrorType = ReturnType<typeof setError>

type AuthActionType = SetUserDataAT | SetAppInitializedAT | SetErrorType

type AuthPayloadType = {
    data: LoginInitialStateType
}
type AppInitializedType = {
    isInitialized: boolean
}
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>