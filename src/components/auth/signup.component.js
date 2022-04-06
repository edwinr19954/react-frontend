import React, { useState, useCallback } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import {APIInfo} from '../../env-config';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [validationError,setValidationError] = useState({})

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        await axios.post(`${APIInfo.api}signup/`, formData).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/")
            }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }, [formData]);
    
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Sign Up</h3>
                <hr />
                <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }

                <form onSubmit={(e) => handleSubmit(e)}>
                    
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={e => setFormData({...formData, name: e.target.value})}/>
                    </div>
                    
                    <div className="form-group mt-2">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={e => setFormData({...formData, email: e.target.value})}/>
                    </div>
                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={e => setFormData({...formData, password: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/sign-in">Login</Link>
                    </p>
                </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
}