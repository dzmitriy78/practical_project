import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI, setNewPasswordResponseType} from "../dal/MyAPI";
import {errorHandler} from "./errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./loginReducer";

const SET_NEW_PASSWORD = "setNewPasswordReducer/SET-NEW-PASSWORD"
const setupNewPassword = (data: setNewPasswordResponseType) => ({
    type: SET_NEW_PASSWORD,
    payload: {data}
}) as const

const setNewPasswordInitialState = {
    info: "",
    error: ""
}
const setNewPasswordReducer = (state = setNewPasswordInitialState, action: SetNewPasswordAT): setNewPasswordInitialStateType => {

    switch (action.type) {
        case SET_NEW_PASSWORD:
            return {
                ...state,
                info: action.payload.data.info,
                error: action.payload.data.error
            }
        default: {
            return state
        }
    }
}
export default setNewPasswordReducer

export const setNewPasswordTC = (password: string, token: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        const res = await registerAPI.setNewPassword(password, token)
        if (res)
            dispatch(setupNewPassword({info: res.info, error: res.error}))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export type setNewPasswordInitialStateType = {
    info: string,
    error: string
}
type SetNewPasswordAT = ReturnType<typeof setupNewPassword> | SetIsLoadingAT
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, SetNewPasswordAT>