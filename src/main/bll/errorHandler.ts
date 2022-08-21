import {setError} from "./loginReducer";
import {AppDispatch} from "./store";

export const errorHandler = (e: any, dispatch: AppDispatch) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
    console.log('Error: ' + {...e})
    dispatch(setError(error))
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
