import React from 'react';
import {useFormik} from "formik";
import style from "./Login.module.scss"
import {LoginInitialStateType, loginTC} from "../../main/bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {AppStoreType} from "../../main/bll/store";
import {FORGOT_PATH, PROFILE_PATH, REGISTER_PATH} from "../../main/Routing";
import Loader from "../../main/ui/Loader";
import MessagesDemo from "../../main/ui/Messages";

const Login = () => {

    const dispatch = useDispatch()
    const {isAuth, error, isLoading} = useSelector<AppStoreType, LoginInitialStateType>((state) => state.login)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 7) {
                errors.password = 'password is short';
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            // @ts-ignore
            dispatch(loginTC(values))
            /* formik.resetForm()*/
        }
    })

    if (isAuth)
        return <Navigate replace to={PROFILE_PATH}/>

    return <div>
        {isLoading && <Loader/>}
        <div>Please enter your login and password or <br/>
            <NavLink to={REGISTER_PATH}>Register</NavLink>
        </div>
        {error && <MessagesDemo errorMessage={error}/>}
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <input
                type={"email"}
                placeholder="Email"
                {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ?
                <div style={{color: "red"}}>{formik.errors.email}</div> : null}
            <input
                type="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <label> Remember me </label>
            <input
                type={"checkbox"}
                {...formik.getFieldProps("rememberMe")}
                checked={formik.values.rememberMe}
            />
            <button type={'submit'} className={style.button} disabled={isLoading}>Login</button>
        </form>
        <div>Forgot your password? <br/>
            <NavLink to={FORGOT_PATH}>Restore password</NavLink>
        </div>
    </div>
}

export default Login;

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}