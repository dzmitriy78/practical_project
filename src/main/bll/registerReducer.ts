import {ThunkType} from "./store";
import {registerAPI, RegisterParamsType} from "../dal/MyAPI";
import {authMe} from "./loginReducer";
import {errorHandler} from "../../utils/errorHandler";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const SET_REGISTER = "registerReducer/SET-REGISTER"

const setRegister = (data: RegisterInitialStateType) => ({
    type: SET_REGISTER,
    payload: {data}
}) as const

const registerInitialState: RegisterInitialStateType = {
    name: "",
    email: "",
}

const registerReducer = (state = registerInitialState, action: RegisterActionType): RegisterInitialStateType => {

    switch (action.type) {
        case SET_REGISTER:
            return {
                ...state,
                name: action.payload.data.name,
                email: action.payload.data.email
            }
        default: {
            return state
        }
    }
}

export default registerReducer;

export const registerTC = (data: RegisterParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await registerAPI.register(data)
        dispatch(setRegister({email: res.data.addedUser.email, name: res.data.addedUser.name}))
        dispatch(authMe())
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export type RegisterInitialStateType = {
    name: string
    email: string
}
type SetRegisterAT = ReturnType<typeof setRegister>
export type RegisterActionType = SetRegisterAT | SetIsLoadingAT