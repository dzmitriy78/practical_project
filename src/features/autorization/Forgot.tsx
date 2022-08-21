import React from 'react';
import {useFormik} from "formik";
import style from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "../../main/bll/store";
import {forgotInitialStateType, forgotPassword, forgotPasswordTC} from "../../main/bll/forgotReducer";
import {useNavigate} from "react-router-dom";
import {NEW_PASSWORD_PATH} from "../../main/Routing";
import {LoginInitialStateType} from "../../main/bll/loginReducer";
import Loader from "../../main/ui/Loader";

const Forgot = () => {

    const {info, error} = useSelector<AppStoreType, forgotInitialStateType>(state => state.forgot)
    const {isLoading} = useSelector<AppStoreType, LoginInitialStateType>((state) => state.login)
    const dispatch: AppDispatch = useDispatch()
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
        onSubmit: async (values) => {
            // @ts-ignore
            await dispatch(forgotPasswordTC(values.email))
            formik.resetForm()
        }
    })
    return <>
        {isLoading && <Loader/>}
        {info && <div>Password recovery information has been sent to the email address provided</div>}
        {error && <div>{error}</div>}
        {info && setTimeout(() => {
            dispatch(forgotPassword({info: "", error: ""}))
            navigate(NEW_PASSWORD_PATH)
        }, 3000)}
        {!info && !error &&
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
                    <button type={'submit'} className={style.button} disabled={isLoading}>Send</button>
                </form>
            </div>}
    </>
};

export default Forgot;

type FormikErrorType = {
    email?: string
}