import {registerAPI, UpdatedUserType} from "../dal/MyAPI";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {errorHandler} from "./errorHandler";
import {authMe, setIsLoadingAC, SetIsLoadingAT} from "./loginReducer";

const UPDATE_USER = "profileReducer/UPDATE-USER"

const renameUser = (data: UpdatedUserType | void) => ({
    type: UPDATE_USER, payload: {data}
}) as const

const profileInitialState = {
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

const profileReducer = (state = profileInitialState, action: ProfileReducerAT): ProfileReducerType => {

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
    dispatch(setIsLoadingAC(true))
    try {
        const res = await registerAPI.updateUser(name, avatar)
        if (res)
            dispatch(renameUser(res))
        dispatch(authMe())
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setIsLoadingAC(false))
    }
}

export default profileReducer;

type ProfileReducerType = {
    updatedUser: {
        _id?: string,
        email?: string,
        rememberMe?: boolean,
        isAdmin?: boolean,
        name: string,
        verified?: boolean,
        publicCardPacksCount?: number,
        created?: string,
        updated?: string,
        __v?: number,
        token?: string,
        tokenDeathTime?: number,
        avatar: string
    },
    token?: string,
    tokenDeathTime?: number
}
type ProfileReducerAT = RenameUserAT | SetIsLoadingAT
type RenameUserAT = ReturnType<typeof renameUser>
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ProfileReducerAT>