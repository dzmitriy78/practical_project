import React from 'react';
import {AppStoreType} from "../../main/bll/store";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import style from "./Login.module.scss";
import {registerTC} from "../../main/bll/registerReducer";
import Loader from "../../main/ui/Loader";
import {RequestLoadingType} from "../../main/bll/appReducer";

const Register: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 8) {
                errors.password = 'password is short';
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            // @ts-ignore
            dispatch(registerTC(values))
            formik.resetForm()
            /* navigate("/profile")*/
        }
    })

    return <div>
        {isLoading === 'loading' && <Loader/>}
        <div>To register, enter your e-mail <br/>and create a password <br/>(at least 7 characters)</div>
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
            <button type={'submit'} className={style.button} disabled={isLoading === 'loading'}>Register</button>
        </form>
    </div>
}

export default Register;

type FormikErrorType = {
    email?: string
    password?: string
}