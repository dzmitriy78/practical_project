import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI} from "../dal/MyAPI";
import {errorHandler} from "./errorHandler";

const FORGOT_PASSWORD = "forgotReducer/FORGOT-PASSWORD"

export const forgotPassword = (data: forgotInitialStateType) => ({
    type: FORGOT_PASSWORD,
    payload: {data}
}) as const

const forgotInitialState = {
    info: "",
    error: ""
}

const forgotReducer = (state = forgotInitialState, action: ForgotReducerAT): forgotInitialStateType => {

    switch (action.type) {
        case FORGOT_PASSWORD:
            return {
                ...state,
                ...action.payload.data
            }
        default: {
            return state
        }
    }
}

export default forgotReducer;


export const forgotPasswordTC = (email: string): ThunkType => async (dispatch) => {
    try {
        const data = await registerAPI.forgot(email)
        if (data)
            dispatch(forgotPassword(data))
    } catch (e: any) {
        errorHandler(e, dispatch)
    } /*finally {
        dispatch(forgotPassword({info: "", error: ""}))
    }*/
}

export type forgotInitialStateType = {
    info: string
    error: string
}
type ForgotReducerAT = ReturnType<typeof forgotPassword>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ForgotReducerAT>
