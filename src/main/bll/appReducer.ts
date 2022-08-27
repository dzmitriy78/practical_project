import {ThunkType} from "./store";
import {authMe} from "./loginReducer";

const SET_IS_LOADING = "loginReducer/SET-IS-LOADING"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"
const SET_ERROR = "loginReducer/SET-ERROR"

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    isInitialized
}) as const
export const setIsLoadingAC = (isLoading: RequestLoadingType) => ({
    type: SET_IS_LOADING,
    isLoading
}) as const

export const setError = (error: string | null) => ({
    type: SET_ERROR,
    error
}) as const

const appInitialState: appInitialStateType = {
    isLoading: 'idle',
    isInitialized: false,
    error: null
}

const appReducer = (state = appInitialState, action: AppReducerAT): appInitialStateType => {

    switch (action.type) {
        case SET_APP_INITIALIZED:
            return {
                ...state,
                isInitialized: action.isInitialized,
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
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

export default appReducer;

export const initializeAppTC = (): ThunkType => async (dispatch) => {
    await dispatch(authMe())
    dispatch(setAppInitializedAC(true))
}

type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
export type SetIsLoadingAT = ReturnType<typeof setIsLoadingAC>
export type SetErrorType = ReturnType<typeof setError>
export type RequestLoadingType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appInitialStateType = {
    isLoading: RequestLoadingType,
    isInitialized: boolean,
    error: null | string
}

export type AppReducerAT = SetAppInitializedAT | SetIsLoadingAT | SetErrorType

