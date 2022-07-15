import React, {useEffect} from 'react';
import './App.css';
import Main from "./main/Main";
import {useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {initializeAppTC} from "./main/bll/loginReducer";

const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                    <Main/>
            </BrowserRouter>
        </div>
    );
}

export default App;
