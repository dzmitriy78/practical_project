import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {ForgotResponseType, registerAPI} from "../dal/MyAPI";
import {errorHandler} from "./errorHandler";

const FORGOT_PASSWORD = "forgotReducer/FORGOT-PASSWORD"

const forgotPassword = (data: ForgotResponseType | void) => ({
    type: FORGOT_PASSWORD,
    payload: {data}
}) as const

const forgotInitialState = {
    email: "",
    error: ""
}

const forgotReducer = (state = forgotInitialState, action: ForgotReducerAT) => {

    switch (action.type) {
        case FORGOT_PASSWORD:
            return {
                ...state,
                data: action.payload.data
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
        dispatch(forgotPassword(data))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

type ForgotReducerAT = ReturnType<typeof forgotPassword>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ForgotReducerAT>
