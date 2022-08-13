import React from 'react';
import {useSelector} from "react-redux";
import {AppStoreType} from "../bll/store";
import {loginResponseType} from "../dal/MyAPI";

const Welcome = () => {
    let userData = useSelector<AppStoreType, loginResponseType>(state => state.login.userData)
    return (
        <div>
          "Привет, " + {userData.name}
        </div>
    );
};

export default Welcome;