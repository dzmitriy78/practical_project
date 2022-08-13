import React from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../main/bll/store";
import {loginResponseType} from "../../main/dal/MyAPI";
import {LOGIN_PATH, REGISTER_PATH} from "../../main/Routing";
import {NavLink} from "react-router-dom";

const Profile = () => {
    let userData = useSelector<AppStoreType, loginResponseType>(state => state.login.userData)
    let isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)

    return (
        <>
            {isAuth
                ? <div>
                    <img src={userData.avatar} alt={"avatar"}/>
                    <div>{userData.name}</div>
                    <div><span>e-mail: </span>{userData.email}</div>
                    <div><span>created: </span>{userData.created}</div>
                    <div><span>number of cards: </span>{userData.publicCardPacksCount}</div>

                </div>
                : <div>Profile is empty.<br/> <span>Please </span>
                    <NavLink to={LOGIN_PATH}>Login</NavLink> <span>or </span>
                    <NavLink to={REGISTER_PATH}>Register</NavLink>
                </div>
            }
        </>);
};

export default Profile;