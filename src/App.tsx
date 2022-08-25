import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./main/bll/store";
import Loader from "./main/ui/Loader";
import {initializeAppTC, RequestLoadingType} from "./main/bll/appReducer";
import MessagesDemo from "./main/ui/Messages";

const App: React.FC = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppStoreType, boolean | undefined>((state) => state.app.isInitialized)
    const error = useSelector<AppStoreType, string | null>((state) => state.app.error)
    const email = useSelector<AppStoreType, string>(state => state.register.email)
    const info = useSelector<AppStoreType, string>(state => state.setNewPassword.info)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>(state => state.app.isLoading)

    useEffect(() => {

        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized)
        return (
            <div>
                Loading...
                <Loader/>
            </div>)

    return (
        <div className="App">
            <Main/>
            {isLoading === "failed" && <MessagesDemo errorMessage={error}/>}
            {isLoading === "succeeded" && email && <MessagesDemo message={email}/>}
            {isLoading === "succeeded" && info && <MessagesDemo message={info}/>}
        </div>
    );
}

export default App;
