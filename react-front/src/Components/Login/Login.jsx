import React from 'react'
import './Login.css'
import '../../App.css'
import video from '../../LoginAssets/video.mp4'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios, { isLogin } from '../../api/axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Landing/Navbar'

const LOGIN_URL = '/users/authenticate';

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isLogin()) {
            console.log("User already logged in. Redirecting to dashboard...");
            navigate("/dashboard");
        }
        console.log(success)
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(LOGIN_URL, {
                email: user,
                password: pwd
            });
            
            console.log(response?.data?.role)
            console.log(response?.data?.token)
            const accessToken = response?.data?.token;
            setAuth({ user, pwd, accessToken });
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', user);
            localStorage.setItem('role', response?.data?.role)
            console.log(user, pwd, response?.data?.role);
            console.log(success);
            setUser("");
            setPwd("");
            setSuccess(true);
            console.log("Redirecting to dashboard...");
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
    
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 400) {
                setErrMsg("Missing usr or pwd");
            } else if (error.response?.status === 403) {
                setErrMsg("Unauth");
            } else {
                setErrMsg("Login failed");
            }
    
            setSuccess(false);
            errRef.current.focus();
        }

    };

    return (
    <>
    <Navbar />
    <div className='loginPage flex'>
        <div className='container flex'>
            <div className='videoDiv'>
                <video src={video} autoPlay muted loop></video>
                <div className="textDiv">
                    <h2 className='title'>Get your dream degree in every field.</h2>
                    <p className='paragraph'>Learn, Improve, Build your future!</p>
                </div>
                <div className="footerDiv flex">
                    <span className='text'>Don't have an account?</span>
                    <Link to={'/register'}>
                    <button className='btn'>Register</button>
                    </Link>
                </div>
            </div>

            <div className="formDiv flex">
                <form onSubmit={handleSubmit} action='' className='form grid'>
                    { success ? <span></span>: <span ref={errRef} className='showMessage'>{errMsg}</span>}
                    <div className="inputDiv">
                        <label htmlFor='username'>Username</label>
                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input type="text" id="username" placeholder='Username' ref={userRef} autoComplete='off' onChange={(e) => setUser(e.target.value)} value={user} required></input>
                        </div>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor='paasword'>Password</label>
                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input type="password" id="password" placeholder='Password' onChange={(e) => setPwd(e.target.value)} value={pwd} required></input>
                        </div>
                    </div>

                    <button type='submit' className='btn flex'>
                        <span>Login</span>
                        <AiOutlineSwapRight className='icon' />
                    </button>

                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login

