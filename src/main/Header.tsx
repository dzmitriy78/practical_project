import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {FORGOT_PATH, LOGIN_PATH, PROFILE_PATH, REGISTER_PATH} from "./Routing"
import style from "../styles/Header.module.scss";
import {logoutTC} from "./bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./bll/store";


const Header = () => {

    let isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)

    const [show, setShow] = useState(false)
    const setActive = ({isActive}: { isActive: boolean }): string => isActive ? style.active : style.item
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginHandler = () => {
        navigate(LOGIN_PATH)
    }
    const logoutHandler = () => {

        // @ts-ignore
        dispatch(logoutTC())
        navigate(LOGIN_PATH)
    }

    return (
        <div className={style.header}>

            <button className={style.btn} onClick={() => setShow(!show)}>{show ? 'hide header' : 'show header'}</button>

            {show && <NavLink className={setActive} to={LOGIN_PATH}>login</NavLink>}
            {show && <NavLink className={setActive} to={REGISTER_PATH}>register</NavLink>}
            {show && <NavLink className={setActive} to={FORGOT_PATH}>forgot</NavLink>}
            {show && <NavLink className={setActive} to={PROFILE_PATH}>profile</NavLink>}
            {isAuth && <button className={style.btn} onClick={logoutHandler}>log out</button>}
            {!isAuth && <button className={style.btn} onClick={loginHandler}>log in</button>}
        </div>
    );
};

export default Header;