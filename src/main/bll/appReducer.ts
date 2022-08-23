import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {authMe} from "./loginReducer";

const SET_IS_LOADING = "loginReducer/SET-IS-LOADING"
const SET_APP_INITIALIZED = "loginReducer/SET-APP-INITIALISED"

export const setAppInitializedAC = (isInitialized: boolean) => ({
    type: SET_APP_INITIALIZED,
    isInitialized
}) as const
export const setIsLoadingAC = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    isLoading
}) as const

const appInitialState = {
    isLoading: false,
    isInitialized: false,
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

type SetAppInitializedAT = {
    type: typeof SET_APP_INITIALIZED,
    isInitialized: boolean
}
export type SetIsLoadingAT = {
    type: typeof SET_IS_LOADING,
    isLoading: boolean
}

export type appInitialStateType = typeof appInitialState

type AppReducerAT = SetAppInitializedAT | SetIsLoadingAT
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, AppReducerAT>
