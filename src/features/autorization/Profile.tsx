import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {LOGIN_PATH, REGISTER_PATH} from "../../main/Routing";
import {NavLink} from "react-router-dom";
import {updateUserTC} from "../../main/bll/profileReducer";
import Loader from "../../main/ui/Loader";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {UserDataType} from "../../main/dal/MyAPI";

const Profile = () => {
    const isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const userData = useSelector<AppStoreType, UserDataType>((state) => state.login.userData)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()
    const [editName, setEditName] = useState(false)
    const [editAvatar, setEditAvatar] = useState(false)
    const [newName, setNewName] = useState<string>(userData.name)
    const [newAvatar, setNewAvatar] = useState<string>("")
    const changeAvatar: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        setNewAvatar(e.currentTarget.value)
    }
    const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewName(e.currentTarget.value)
    }
    const setUpdateUser = async () => {
        await setEditAvatar(false)
        await setEditName(false)

        dispatch(updateUserTC(newName, newAvatar))
    }

    return (
        <>
            {isLoading === 'loading' && <Loader/>}
            {isAuth
                ? <div>
                    <div onBlur={setUpdateUser}>
                        <div onDoubleClick={() => setEditAvatar(true)}>
                            <img style={{maxWidth: "100px"}}
                                 src={userData.avatar}
                                 alt={"avatar"}/>
                        </div>
                        {editAvatar && <input placeholder={"insert avatar"}
                                              autoFocus={true}
                                              onChange={changeAvatar}
                                              defaultValue={userData.avatar}
                        />}
                    </div>
                    <div onBlur={setUpdateUser}>
                        <div onDoubleClick={() => setEditName(true)}><span>Name: </span>{userData.name}</div>
                        {editName && <input placeholder={"enter image url"}
                                            autoFocus={true}
                                            onChange={changeName}
                                            defaultValue={userData.name}
                        />}
                    </div>
                    <div><span>e-mail: </span>{userData.email}</div>
                    <div><span>created: </span>{userData.created}</div>
                    <div><span>number of cards: </span>{userData.publicCardPacksCount}</div>

                </div>
                : <div>Profile is empty.<br/> <span>Please </span>
                    <NavLink to={LOGIN_PATH}>Log in</NavLink> <span>or </span>
                    <NavLink to={REGISTER_PATH}>Register</NavLink>
                </div>
            }
        </>);
};

export default Profile;