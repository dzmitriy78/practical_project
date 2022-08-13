import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {registerAPI, RegisterParamsType} from "../dal/MyAPI";
import {authMe, setError, SetErrorType} from "./loginReducer";

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
                ...action.payload
            }
        default: {
            return state
        }
    }
}

export default registerReducer;

export const registerTC = (data: RegisterParamsType): ThunkType => async (dispatch) => {
    try {
        const res = await registerAPI.register(data)
        dispatch(setRegister({email: res.data.addedUser.email, name: res.data.addedUser.name}))
        dispatch(authMe())
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        /*console.log('Error: ' + {...error})*/
        dispatch(setError(error))
    }
}

type RegisterInitialStateType = {
    name: string
    email: string
}

type RegisterActionType = ReturnType<typeof setRegister> | SetErrorType

type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, RegisterActionType>