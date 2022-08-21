import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "../../main/bll/store";
import {useFormik} from "formik";
import style from "./Login.module.scss";
import {setNewPasswordInitialStateType, setNewPasswordTC} from "../../main/bll/setNewPasswordReducer";
import Loader from "../../main/ui/Loader";
import {LoginInitialStateType} from "../../main/bll/loginReducer";
import MessagesDemo from "../../main/ui/Messages";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH} from "../../main/Routing";

const SetNewPassword = () => {
    const {error, info} = useSelector<AppStoreType, setNewPasswordInitialStateType>(state => state.setNewPassword)
    const {isLoading} = useSelector<AppStoreType, LoginInitialStateType>((state) => state.login)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
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
            resetPasswordToken: ""
        },
        onSubmit: async (values) => {
            // @ts-ignore
            await dispatch(setNewPasswordTC(values.password, values.resetPasswordToken))
            formik.resetForm()
            setTimeout(() => navigate(LOGIN_PATH), 4000)
        }
    })

    return <div>
        {isLoading && <Loader/>}
        {error && <MessagesDemo errorMessage={error}/>}
        {info && <MessagesDemo message={info}/>}
        <div>To restore access, enter a new password and the token received by email</div>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            {error && <div>
                {error}
            </div>}
            <input
                type={"password"}
                placeholder="set new password"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <input
                type={"text"}
                placeholder="set token"
                {...formik.getFieldProps("resetPasswordToken")}
            />
            <button type={'submit'} className={style.button} disabled={isLoading}>Send</button>
        </form>
    </div>
}

export default SetNewPassword;

type FormikErrorType = {
    password?: string
}