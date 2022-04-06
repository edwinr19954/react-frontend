import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {login} from '../../actions/userActions'

export default function Login() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userLogin?.userInfo?.remember_token);
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [validationError,setValidationError] = useState({})

    useEffect(() => {
        if (localStorage.getItem("token")) {
          window.location.replace("/");
        }
    }, [userInfo]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        dispatch(login(formData));

    }, [formData]);

    
    return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Sign In</h3>
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
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="form-group mt-2">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={e => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div className="form-group mt-2">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                        <p className="forgot-password text-left">
                            <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
    
}