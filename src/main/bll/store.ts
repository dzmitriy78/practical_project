import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import forgotReducer from "./forgotReducer";
import newProfileReducer from "./newProfileReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    newProfile: newProfileReducer,
    profile: profileReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type AppStoreType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch