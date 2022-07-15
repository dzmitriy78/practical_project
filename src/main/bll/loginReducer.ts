import {Dispatch} from "redux"
import {authAPI, LoginParamsType} from "../dal/MyAPI"

const SET_USER_DATA = "SET-USER-DATA"
const SET_APP_INITIALIZED = "SET-APP-INITIALISED"

export const setAuthUserData = (name: string | null, email: string | null, avatar: string | null, isAuth: boolean): AuthActionType => ({
    type: SET_USER_DATA,
    payload: {name, email, avatar, isAuth}
});

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    payload: {isInitialized}
})

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

export const authMe = () => {
    return (dispatch: (arg0: AuthActionType) => void) => {
        return authAPI.me()
            .then(data => {
                    if (!data.data.in) {
                        let {name, email, avatar} = data.data;
                        dispatch(setAuthUserData(name, email, avatar, true))
                        console.log(data.data)
                        alert("Привет, " + name);
                    }
                }
            )
            .catch((e: any) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })
    }
}

export const loginTC = (data: LoginParamsType) => (dispatch: (arg0: (dispatch: (arg0: AuthActionType) => void) => Promise<void>) => void) => {
    //dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then(() => {
            dispatch(authMe())
        })
        .catch((e: any) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            // handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(() => {
            dispatch(setAuthUserData(null, null, null, false))
        })
        .catch(() => {

        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (!res.data.in) {
                let {name, email, avatar} = res.data;
                dispatch(setAuthUserData(name, email, avatar, true))
                dispatch(setAppInitializedAC(true));
            }
        })
}


export type LoginInitialStateType = {
    isAuth: boolean
    isInitialized: boolean
}
type AuthActionType = {
    type: typeof SET_USER_DATA | typeof SET_APP_INITIALIZED,
    payload: AuthPayloadType | AppInitializedType
}
type AuthPayloadType = {
    name: string | null
    email: string | null
    avatar: string | null
    isAuth: boolean
}
type AppInitializedType = {
    isInitialized: boolean
}