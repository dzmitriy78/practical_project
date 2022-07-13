import React from 'react';
import './App.css';
import Main from "./main/Main";
import {Provider} from "react-redux";
import store from "./main/bll/store";
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
