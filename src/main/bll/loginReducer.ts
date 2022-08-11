import {ThunkAction} from "redux-thunk";
import {authAPI, LoginParamsType} from "../dal/MyAPI"
import {AppStoreType} from "./store";

const SET_USER_DATA = "loginReducer/SET-USER-DATA"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"

export const setAuthUserData = (name: string | null, email: string | null, avatar: string | null, isAuth: boolean): AuthActionType => ({
    type: SET_USER_DATA,
    payload: {name, email, avatar, isAuth}
}) as const;

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    payload: {isInitialized}
}) as const

const loginInitialState: LoginInitialStateType = {
    isAuth: false,
    isInitialized: false
}

const loginReducer = (state = loginInitialState, action: { type: string; payload: { isInitialized: boolean; isAuth?: boolean; }; }): LoginInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
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
            let {name, email, avatar} = data.data;
            dispatch(setAuthUserData(name, email, avatar, true))
            alert("Привет, " + name);
        }
    } catch {
        (e: any) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        }
    }
}


export const loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    //dispatch(setAppStatusAC({status:'loading'}))
    await authAPI.login(data)
    try {
        await dispatch(authMe())
    } catch {
        (e: any) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            // handleServerNetworkError(error, dispatch)
        }
    }
}

export const logoutTC = (): ThunkType => async (dispatch) => {
    await authAPI.logout()
    try {
        dispatch(setAuthUserData(null, null, null, false))
    } catch (e) {
    }
}

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    const res = await authAPI.me()
    try {
        if (!res.data.in) {
            let {name, email, avatar} = res.data;
            dispatch(setAuthUserData(name, email, avatar, true))
            dispatch(setAppInitializedAC(true));
        }
    } catch (e) {

    }
}

export type LoginInitialStateType = {
    isAuth: boolean
    isInitialized: boolean
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
    name: string | null
    email: string | null
    avatar: string | null
    isAuth: boolean
}
type AppInitializedType = {
    isInitialized: boolean
}
export type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AuthActionType>