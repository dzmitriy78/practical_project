import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./main/bll/loginReducer";
import {AppStoreType} from "./main/bll/store";
import Loader from "./main/ui/Loader";

const App: React.FC = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppStoreType, boolean | undefined>((state) => state.login.isInitialized)

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    /*if (!isInitialized)
        return <Loader/>*/
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;
