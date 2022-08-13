import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"

export const setAuthUserData = (data: LoginInitialStateType) => ({
    type: SET_USER_DATA,
    payload: {data}
}) as const;

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    payload: {isInitialized}
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
    }
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
        default: {
            return state
        }
    }
}
export default loginReducer;

export const authMe = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    try {
        if (!data.data.in) {
            let res = data.data;
            dispatch(setAuthUserData({isAuth: true, isInitialized: true, userData: res}))
        }
    } catch (e: any) {
        e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        console.log('Error: ' + {...e})
    }
}


export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    //dispatch(setAppStatusAC({status:'loading'}))
    await authAPI.login(data)
    try {
        await dispatch(authMe())
    } catch (e: any) {
        /* const error = e.response
             ? e.response.data.error
             : (e.message + ', more details in the console')
 */
        console.log('Error: ' + {...e})
    }
}

export const logoutTC = (): ThunkType => async (dispatch) => {
    await authAPI.logout()
    try {
        dispatch(setAuthUserData({
            isAuth: false,
            isInitialized: true,
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
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
    }
}

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    const res = await authAPI.me()
    try {
        if (!res.data.in) {
            dispatch(setAuthUserData({isAuth: true, isInitialized: true, userData: res.data}))
            dispatch(setAppInitializedAC(true));
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
    }
}

export type LoginInitialStateType = {
    isAuth: boolean
    isInitialized: boolean
    userData: {
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
    }
}
type SetUserDataAT = {
    type: typeof SET_USER_DATA,
    payload: AuthPayloadType
}
type SetAppInitializedAT = {
    type: typeof SET_APP_INITIALIZED,
    payload: AppInitializedType
}

type AuthActionType = SetUserDataAT | SetAppInitializedAT

type AuthPayloadType = {
    data: LoginInitialStateType
}
type AppInitializedType = {
    isInitialized: boolean
}
export type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>