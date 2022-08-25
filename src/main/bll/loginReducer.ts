import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"

export const setAuthUserData = (data: LoginInitialStateType) => ({
    type: SET_USER_DATA,
    payload: {data}
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
    }
}

const loginReducer = (state = loginInitialState, action: AuthActionType): LoginInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth: action.payload.data.isAuth,
                userData: action.payload.data.userData
            }
        default: {
            return state
        }
    }
}
export default loginReducer;

export const authMe = (): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const data = await authAPI.me()
        if (data) {
            dispatch(setAuthUserData({isAuth: true, userData: data}))
        }
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        await authAPI.login(data)
        await dispatch(authMe())
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export const logoutTC = (): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
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
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export type LoginInitialStateType = {
    isAuth: boolean
    userData: UserDataType
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

type AuthActionType = SetUserDataAT | SetIsLoadingAT

type AuthPayloadType = {
    data: LoginInitialStateType
}

type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>