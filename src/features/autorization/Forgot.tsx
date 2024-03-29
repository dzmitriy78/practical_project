import React from 'react';
import {useFormik} from "formik";
import style from "../../styles/Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {forgotPassword, forgotPasswordTC} from "../../main/bll/forgotReducer";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH} from "../../main/Routing";
import Loader from "../../main/ui/Loader";
import {RequestLoadingType} from "../../main/bll/appReducer";

const Forgot = () => {

    const info = useSelector<AppStoreType, string>(state => state.forgot.info)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()
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
        onSubmit: (values) => {
            dispatch(forgotPasswordTC(values.email))
            formik.resetForm()
        }
    })
    if (info) setTimeout(() => {
        dispatch(forgotPassword({info: "", error: ""}))
        navigate(LOGIN_PATH)
    }, 4000)
    return <>
        {isLoading === 'loading' && <Loader/>}
        {info && <div>Password recovery information has been sent to the email address provided</div>}

        {!info &&
            <div>
                <div>To recovery password, enter your e-mail</div>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <input
                        type={"email"}
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                    <button type={'submit'} className={style.button} disabled={isLoading === 'loading'}>Send</button>
                </form>
            </div>}
    </>
};

export default Forgot;

type FormikErrorType = {
    email?: string
}