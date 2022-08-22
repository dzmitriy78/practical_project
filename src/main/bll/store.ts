import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import forgotReducer from "./forgotReducer";
import setNewPasswordReducer from "./setNewPasswordReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    setNewPassword: setNewPasswordReducer,
    profile: profileReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type AppStoreType = ReturnType<typeof rootReducer>