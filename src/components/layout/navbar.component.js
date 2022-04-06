import React, { useState, useCallback, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../actions/userActions'

export default function NavBar() {
    const dispatch = useDispatch();
    const userInfo = localStorage.getItem('token');
    
    const clickLogOut = useCallback(() => {
        dispatch(logout());
    }, []);

    return (
        <Navbar bg="primary">
            <Container>
            <Link to={"/"} className="navbar-brand text-white">
                MoveHQ Test
            </Link>
            {userInfo? (
                <a href="#" className="text-white" onClick={clickLogOut}>LogOut</a>
            ) : ""
            }
            
            </Container>
        </Navbar>
    );
}