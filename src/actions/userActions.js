import axios from "axios";
import { APIInfo } from "../env-config";
import Swal from 'sweetalert2';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (reqPayload) => async (dispatch) => {
    
    try {
        
        dispatch({
        type: USER_LOGIN_REQUEST,
        });

        await axios.post(`${APIInfo.api}login/`, reqPayload).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data && data?.data,
            });
            if (data?.data?.remember_token) {
                localStorage.setItem("token", data?.data?.remember_token);
            }
            }).catch(({response})=>{
            if(response.status===422){
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: response.message
                });
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: response.message
                });
            }
        })

        
    } catch (error) {
        dispatch({
        type: USER_LOGIN_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    await axios.get(`${APIInfo.api}logout/`).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        dispatch({ type: USER_LOGOUT });
        
    }).catch(({response})=>{
        if(response.status===422){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: response.message
            });
        }else{
            Swal.fire({
                text:response.data.message,
                icon:"error"
            })
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: response.message
            });
        }
    })
  
  document.location.href = "/sign-in";
};
