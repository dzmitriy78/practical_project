import React from 'react';
import {useFormik} from "formik";
import style from "./Login.module.scss"
import {loginTC} from "../../main/bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppDispatch, AppStoreType} from "../../main/bll/store";

const Login = () => {

    const dispatch: AppDispatch = useDispatch()

    let isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const error = useSelector<AppStoreType, string | null | undefined>(state => state.login.error)

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
        onSubmit: async (values) => {
            // @ts-ignore
            await dispatch(loginTC(values))
            formik.resetForm()
        }
    })
    /*
        if (isLoggedIn) {
            return <Redirect to={"/"} />
        }*/
    if (isAuth) {
        return <Navigate replace to="/profile"/>
    }

    return <div>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            {error && <div>
                {error}
            </div>}
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

            <button type={'submit'} className={style.button}>Login</button>
        </form>
    </div>
}

export default Login;

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}