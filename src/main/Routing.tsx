import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../features/autorization/Login";
import Register from "../features/autorization/Register";
import Forgot from "../features/autorization/Forgot";
import NewProfile from "../features/autorization/NewProfile";
import Profile from "../features/autorization/Profile";

export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const FORGOT_PATH = '/forgot'
export const NEW_PROFILE_PATH = '/newProfile'
export const PROFILE_PATH = '/profile'

const Routing = () => {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Navigate to={LOGIN_PATH}/>}/>
                <Route path={LOGIN_PATH} element={<Login/>}/>
                <Route path={REGISTER_PATH} element={<Register/>}/>
                <Route path={FORGOT_PATH} element={<Forgot/>}/>
                <Route path={NEW_PROFILE_PATH} element={<NewProfile/>}/>
                <Route path={PROFILE_PATH} element={<Profile/>}/>
                <Route path="*" element={
                    <div style={{fontSize: 100, color: "teal"}}>
                        Упс! Страница не найдена!
                    </div>}/>
            </Routes>
        </>
    );
};

export default Routing;