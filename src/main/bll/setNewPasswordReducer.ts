import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI, setNewPasswordResponseType} from "../dal/MyAPI";
import {errorHandler} from "./errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./loginReducer";

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
            return {
                ...state,
                ...action.payload.data
            }
        default: {
            return state
        }
    }
}
export default setNewPasswordReducer

export const setNewPasswordTC = (password: string, token: string): ThunkType=> async (dispatch) => {
    dispatch(setIsLoadingAC(true))
    try {
        const data = await registerAPI.setNewPassword(password, token)
        dispatch(setupNewPassword(data))
    } catch (e) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

type setNewPasswordInitialStateType = {
    info: string,
    error: string
}
type SetNewPasswordAT = ReturnType<typeof setupNewPassword> | SetIsLoadingAT
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, SetNewPasswordAT>