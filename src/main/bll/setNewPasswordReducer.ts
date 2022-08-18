import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI, setNewPasswordResponseType} from "../dal/MyAPI";
import {errorHandler} from "./errorHandler";

const SET_NEW_PASSWORD = "setNewPasswordReducer/SET-NEW-PASSWORD"
const setupNewPassword = (data: setNewPasswordResponseType | void) => ({
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
            return <setNewPasswordInitialStateType>{
                ...state,
                data: action.payload.data
            }
        default: {
            return state
        }
    }
}
export default setNewPasswordReducer

export const setNewPasswordTC = (password: string, token: string): ThunkType=> async (dispatch) => {
    try {
        const data = await registerAPI.setNewPassword(password, token)
        dispatch(setupNewPassword(data))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}



type setNewPasswordInitialStateType = {
    info: string,
    error: string
}
type SetNewPasswordAT = ReturnType<typeof setupNewPassword>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, SetNewPasswordAT>