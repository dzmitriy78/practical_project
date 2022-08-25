import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI} from "../dal/MyAPI";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const SET_NEW_PASSWORD = "setNewPasswordReducer/SET-NEW-PASSWORD"
export const setupNewPassword = (data: setNewPasswordInitialStateType) => ({
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
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await registerAPI.setNewPassword(password, token)
        dispatch(setupNewPassword({info: res.data.info, error: res.data.error}))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export type setNewPasswordInitialStateType = typeof setNewPasswordInitialState
type SetNewPasswordAT = ReturnType<typeof setupNewPassword> | SetIsLoadingAT
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, SetNewPasswordAT>