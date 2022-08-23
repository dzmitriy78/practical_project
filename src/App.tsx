import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./main/bll/store";
import Loader from "./main/ui/Loader";
import {initializeAppTC} from "./main/bll/appReducer";

const App: React.FC = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppStoreType, boolean | undefined>((state) => state.app.isInitialized)

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
        </div>
    );
}

export default App;
