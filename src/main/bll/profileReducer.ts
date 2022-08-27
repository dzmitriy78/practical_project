import {registerAPI, UpdatedUserType} from "../dal/MyAPI";
import {ThunkType} from "./store";
import {errorHandler} from "../../utils/errorHandler";
import {setAuthUserData, SetUserDataAT} from "./loginReducer";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const UPDATE_USER = "profileReducer/UPDATE-USER"
const renameUser = (data: UpdatedUserType) => ({
    type: UPDATE_USER, payload: {data}
}) as const

const profileInitialState: ProfileInitialStateType = {
    updatedUser: {
        _id: "",
        email: "",
        rememberMe: false,
        isAdmin: false,
        name: "",
        verified: false,
        publicCardPacksCount: 0,
        created: "",
        updated: "",
        __v: 0,
        token: "",
        tokenDeathTime: 0,
        avatar: ""
    },
    token: "",
    tokenDeathTime: 0
}

const profileReducer = (state = profileInitialState, action: ProfileReducerAT): ProfileInitialStateType => {

    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload.data
            }
        default: {
            return state
        }
    }
}

export const updateUserTC = (name: string, avatar: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await registerAPI.updateUser(name, avatar)
        if (res.data)
            dispatch(renameUser(res.data))
        dispatch(setAuthUserData({isAuth: true, userData: res.data.updatedUser}))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export default profileReducer;

type ProfileInitialStateType = UpdatedUserType

export type ProfileReducerAT = RenameUserAT | SetIsLoadingAT | SetUserDataAT
type RenameUserAT = ReturnType<typeof renameUser>