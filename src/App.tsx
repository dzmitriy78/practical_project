import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./main/bll/loginReducer";
import {AppDispatch} from "./main/bll/store";

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;
