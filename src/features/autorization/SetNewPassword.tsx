import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../main/bll/store";
import {useFormik} from "formik";
import style from "./Login.module.scss";
import {setNewPasswordTC, setupNewPassword} from "../../main/bll/setNewPasswordReducer";
import Loader from "../../main/ui/Loader";
import {setError} from "../../main/bll/loginReducer";
import MessagesDemo from "../../main/ui/Messages";
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_PATH} from "../../main/Routing";


const SetNewPassword = () => {
    const info = useSelector<AppStoreType, string>(state => state.setNewPassword.info)
    const error = useSelector<AppStoreType, string | null | undefined>(state => state.login.error)
    const isLoading = useSelector<AppStoreType, boolean>((state) => state.app.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useParams()
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.password.length < 7) {
                errors.password = 'password is short';
            }
            return errors;
        },
        initialValues: {
            password: '',
            resetPasswordToken: token
        },
        onSubmit: (values) => {
            // @ts-ignore
            dispatch(setNewPasswordTC(values.password, values.resetPasswordToken))
            formik.resetForm()
        }
    })
    if (info) setTimeout(() => {
        dispatch(setupNewPassword({info: "", error: ""}))
        dispatch(setError(""))
        navigate(LOGIN_PATH)
    }, 4000)
    return <>
        {isLoading && <Loader/>}
        {error && <MessagesDemo errorMessage={error}/>}
        {info && <MessagesDemo message={info}/>}
        <div>To restore access, enter a new password</div>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <input
                type={"password"}
                placeholder="set new password"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <input
                type={"hidden"}
                placeholder="set token"
                {...formik.getFieldProps("resetPasswordToken")}
            />
            <button type={'submit'} className={style.button} disabled={isLoading}>Send</button>
        </form>
    </>
}

export default SetNewPassword;

type FormikErrorType = {
    password?: string
}