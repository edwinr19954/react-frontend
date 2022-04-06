import { configureStore } from '@reduxjs/toolkit';
// import from reducers
import { userLoginReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
    userLogin : { userInfo : 
        {
            remember_token: userInfoFromStorage
        }
    },
}

const store = configureStore({
    reducer: {
        userLogin: userLoginReducer
    },
    initialState
})

export default store