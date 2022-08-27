import React from 'react';
import {useFormik} from "formik";
import style from "../../styles/Login.module.scss"
import {loginTC} from "../../main/bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {FORGOT_PATH, REGISTER_PATH} from "../../main/Routing";
import Loader from "../../main/ui/Loader";
import Welcome from "../../main/ui/Welcome";
import {RequestLoadingType} from "../../main/bll/appReducer";

const Login = () => {

    const dispatch = useDispatch<DispatchType>()
    const isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)

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
            dispatch(loginTC(values))
        }
    })

    function togglePassword() {
        const x: any = document.getElementById("login");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return <>
        {isLoading === 'loading' && <Loader/>}
        {isAuth && <Welcome/>}
        {!isAuth && <div>
            <div>Please enter your login and password or <br/>
                <NavLink to={REGISTER_PATH}>Register</NavLink>
            </div>
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
                    id="login"
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                <label>Show Password</label>
                <input type="checkbox" onClick={togglePassword}/>
                <label> Remember me </label>
                <input
                    type={"checkbox"}
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                />
                <button type={'submit'} className={style.button} disabled={isLoading === 'loading'}>Login</button>
            </form>
            <div>Forgot your password? <br/>
                <NavLink to={FORGOT_PATH}>Restore password</NavLink>
            </div>
        </div>}


    </>
}

export default Login;

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}