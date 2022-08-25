import {Dispatch} from "redux";
import {setError, setIsLoadingAC} from "../main/bll/appReducer";

export const errorHandler = (e: any, dispatch: Dispatch) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
    console.log('Error: ' + {...e})
    dispatch(setError(error))
    dispatch(setIsLoadingAC('failed'))
}


/*
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC({error: error.message ? error.message: 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}*/
