import React from 'react';
import {useFormik} from "formik";
import style from "./Login.module.scss"

const Login = () => {


    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 4) {
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
            alert(JSON.stringify(values))
            formik.resetForm()
        }
    })
    /*
        if (isLoggedIn) {
            return <Redirect to={"/"} />
        }*/


    return <div>

        <form className={style.form} onSubmit={formik.handleSubmit}>
            <>
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

            </>
        </form>
    </div>
}

export default Login;

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}