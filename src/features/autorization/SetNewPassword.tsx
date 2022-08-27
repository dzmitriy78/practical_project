import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {useFormik} from "formik";
import style from "../../styles/Login.module.scss";
import {setNewPasswordTC} from "../../main/bll/setNewPasswordReducer";
import Loader from "../../main/ui/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_PATH} from "../../main/Routing";
import {RequestLoadingType} from "../../main/bll/appReducer";

const SetNewPassword = () => {
    const info = useSelector<AppStoreType, string>(state => state.setNewPassword.info)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
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
            resetPasswordToken: token as string
        },
        onSubmit: (values) => {
            dispatch(setNewPasswordTC(values.password, values.resetPasswordToken))
            formik.resetForm()
        }
    })
    if (info) setTimeout(() => {
        navigate(LOGIN_PATH)
    }, 4000)

    function togglePassword() {
        const x: any = document.getElementById("setNewPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return <>
        {isLoading === 'loading' && <Loader/>}

        <div>To restore access, enter a new password</div>
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <input
                type={"password"}
                placeholder="set new password"
                id="setNewPassword"
                {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
            <label>Show Password</label>
            <input type="checkbox" onClick={togglePassword}/>
            <input
                type={"hidden"}
                placeholder="set token"
                {...formik.getFieldProps("resetPasswordToken")}
            />
            <button type={'submit'} className={style.button} disabled={isLoading === 'loading'}>Send</button>
        </form>
    </>
}

export default SetNewPassword;

type FormikErrorType = {
    password?: string
}