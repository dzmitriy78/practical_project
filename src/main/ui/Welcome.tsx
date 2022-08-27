import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from "../bll/store";
import {LoginResponseType} from "../dal/MyAPI";
import {useNavigate} from "react-router-dom";
import {PROFILE_PATH} from "../Routing";

const Welcome = () => {
    const userData = useSelector<AppStoreType, LoginResponseType>(state => state.login.userData)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(PROFILE_PATH)
        }, 2000)
    }, [])
    return (
        <div>
            Привет, {userData.name}
        </div>
    );
};

export default Welcome;