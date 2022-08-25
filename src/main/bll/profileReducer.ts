import {registerAPI, UpdatedUserType} from "../dal/MyAPI";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {errorHandler} from "../../utils/errorHandler";
import {authMe} from "./loginReducer";
import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";

const UPDATE_USER = "profileReducer/UPDATE-USER"
const renameUser = (data: UpdatedUserType) => ({
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
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await registerAPI.updateUser(name, avatar)
        if (res)
            dispatch(renameUser(res))
        dispatch(authMe())
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
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