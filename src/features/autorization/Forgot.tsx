import React from 'react';
import {useFormik} from "formik";
import style from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "../../main/bll/store";
import {forgotPasswordTC} from "../../main/bll/forgotReducer";

const Forgot = () => {

    const error = useSelector<AppStoreType, string | null | undefined>(state => state.forgot.error)
    const dispatch: AppDispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        initialValues: {
            email: ''
        },
        onSubmit:  (values) => {
            // @ts-ignore
            dispatch(forgotPasswordTC(values.email))
            formik.resetForm()
            /*  navigate("/profile")*/
        }
    })
    /*
        if (isLoggedIn) {
            return <Redirect to={"/"} />
        }*/
    return <div>
        <div>To recovery password, enter your e-mail</div>
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
            <button type={'submit'} className={style.button}>Send</button>
        </form>
    </div>
};

export default Forgot;

type FormikErrorType = {
    email?: string
}