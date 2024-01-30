import React from "react";
import "./Register.css";
import "../../App.css";
import video from "../../LoginAssets/video.mp4";
import { Link, NavLink, Navigate } from "react-router-dom";
import { BsFillShieldLockFill } from "react-icons/bs";
import {
  AiOutlineSwapRight,
  AiOutlineUser,
  AiFillPlusSquare,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../Login/context/AuthProvider";
import axios, { isLogin } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import RegisterService from "../../services/RegisterService";

const REGISTER_URL = "/users/newFormaterExterne";

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [competences, setCompetences] = useState("");
  const [name, setName] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogin()) {
      navigate("/dashboard");
    }
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (pwd !== confirmPwd) {
      setErrMsg("Passwords do not match");
      setSuccess(false);
      errRef.current.focus();
      return;
    }

    try {
      setLoading(true);
      const userData = {
        email: user,
        password: pwd,
        name: name,
        competence: competences,
      };

      const response = await RegisterService.registerUser(userData);

      setUser("");
      setPwd("");
      setConfirmPwd("");
      setName("");
      setCompetences("");
      setSuccess(true);
      navigate("/login");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="registerPage flex">
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className="title">Get your dream degree in every field.</h2>
              <p className="paragraph">Learn, Improve, Build your future!</p>
            </div>
            <div className="footerDiv flex">
              <span className="text">Already have an account?</span>
              <Link to={"/login"}>
                <button className="btn">Login</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">
            <form onSubmit={handleSubmit} action="" className="form grid">
              {success ? (
                <span></span>
              ) : (
                <span ref={errRef} className="showMessage">
                  {errMsg}
                </span>
              )}
              <div className="inputDiv">
                <label htmlFor="name">Name</label>
                <div className="input flex">
                  <AiOutlineUser className="icon" />
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  ></input>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="competences">Competences</label>
                <div className="input flex">
                  <AiFillPlusSquare className="icon" />
                  <input
                    type="text"
                    id="competences"
                    placeholder="Competences"
                    autoComplete="off"
                    onChange={(e) => setCompetences(e.target.value)}
                    value={competences}
                    required
                  ></input>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <MdEmail className="icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  ></input>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  ></input>
                  <span
                    className={`${showPassword ? "visible" : ""}`}
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Confirm Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    value={confirmPwd}
                    required
                  ></input>
                  <span
                    className={`${showPassword ? "visible" : ""}`}
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`btn flex ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                <span>Register</span>
                <AiOutlineSwapRight className="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
