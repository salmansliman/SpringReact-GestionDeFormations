import React from 'react'
import './Login.css'
import '../../App.css'
import video from '../../LoginAssets/video.mp4'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../LoginAssets/uni.png'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";


const Login = () => {
  return (
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
                <div className="headerDiv">
                    <img src={logo} alt='Abdelmalek Essaadi University Logo'></img>
                    <h3>Welcome Back!</h3>
                </div>
                <form action='' className='form grid'>
                    <span className='showMessage'>login errors</span>
                    <div className="inputDiv">
                        <label htmlFor='username'>Username</label>
                        <div className="input flex">
                        <FaUserShield className='icon'/>
                        <input type="text" id="username" placeholder='Username'></input>
                        </div>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor='paasword'>Password</label>
                        <div className="input flex">
                        <BsFillShieldLockFill className='icon'/>
                        <input type="password" id="password" placeholder='Password'></input>
                        </div>
                    </div>

                    <button type='submit' className='btn flex'>
                        <span>Login</span>
                        <AiOutlineSwapRight className='icon' />
                    </button>

                    <span className='forgotPassword'>
                        Forgot password? <a href=''>Recover now</a>
                    </span>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login