import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {FORGOT_PATH, LOGIN_PATH, NEW_PROFILE_PATH, PROFILE_PATH, REGISTER_PATH} from "./Routing"
import style from "./Header.module.scss";


const Header = () => {

    const [show, setShow] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const setActive = ({isActive}: { isActive: boolean }): string => isActive ? style.active : style.item
    const navigate = useNavigate()

   const loginHandler = () => {
        setIsLogged(true)
        navigate (LOGIN_PATH)
   }
   const logoutHandler = () => {
        setIsLogged(false)
        navigate (LOGIN_PATH)
   }

    return (
        <div className={style.header}>

            <button className={style.btn} onClick={() => setShow(!show)}>{show ? 'hide header' : 'show header'}</button>

            {show && <NavLink className={setActive} to={LOGIN_PATH}>login</NavLink>}
            {show && <NavLink className={setActive} to={REGISTER_PATH}>register</NavLink>}
            {show && <NavLink className={setActive} to={FORGOT_PATH}>forgot</NavLink>}
            {show && <NavLink className={setActive} to={NEW_PROFILE_PATH}>new Profile</NavLink>}
            {show && <NavLink className={setActive} to={PROFILE_PATH}>profile</NavLink>}
            {isLogged
                ? <button className={style.btn} onClick={logoutHandler}>log out</button>
                : <button className={style.btn} onClick={loginHandler}>log in</button>}
        </div>
    );
};

export default Header;