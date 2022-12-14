/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../AuthRegister/AuthRegister.scss";
import authlogo from "../../AuthImges/authlogo.png";
// import appleStore from '../../AuthImges/apple-store.png'
// import playStore from '../../AuthImges/play-store.png'
import { AiFillFacebook } from "react-icons/ai";
import "./VerifyMobile.scss";
import { useState } from "react";
// import swla from 'sweetalert'
import axios from "axios";
// import cookie from 'js-cookie'
// import { useContext } from "react";
// import AuthContext from "../../../../context/AuthContext";
// import LoaderContext from '../../../../context/LoaderContext';
// import { creatToast } from '../../../../utility/toast'
import AuthFooter from "../AuthFooter/AuthFooter";

const VerifyMobile = () => {
  // error msg alert
  const [msg, setMsg] = useState({
    type: "",
    message: "",
    status: false,
  });

  const alertClose = () => {
    setMsg({
      type: "",
      message: "",
      status: false,
    });
  };

  // use loader context
  // const {loaderDispatch} = useContext(LoaderContext)

  // use navigate
  const navigate = useNavigate();

  // form filed state
  const [input, setInput] = useState({
    auth: "",
    code: "",
  });
  console.log(input);

  //  input design con
  const inpDcon = {
    authL: input.auth ? "cont-lavel" : "",
    authI: input.auth ? "cont-input" : "",
    codeL: input.code ? "cont-lavel" : "",
    codeI: input.code ? "cont-input" : "",
  };

  // handle Input data
  const handleInput = e => {
    // setInput({...input, [e.target.name] : e.target.value})
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // form control
  const [formview, setFormview] = useState("phone");

  // use contex
  // const { authdispatch, authstate } = useContext(AuthContext);

  // handle User Resend verify
  const sendVerifyCode = async e => {
    e.preventDefault();

    await axios
      .post("http://localhost:5050/api/user/phone-code-sent", input)
      .then(res => {
        if (res.data.action === "dataNotFound") {
          setMsg({
            type: "warning",
            message: res.data.message,
            status: res.data.action,
          });
        }

        if (res.data.action === "vCode") {
          setMsg({
            type: "success",
            message: res.data.message,
            status: "vCode",
          });
          setFormview("vCode");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // handle Phone code verify
  const verifyPhoneCode = async e => {
    e.preventDefault();

    await axios
      .post("http://localhost:5050/api/user/phone-code-verify", input)
      .then(res => {
        if (res.data.action === "codeError") {
          setMsg({
            type: "danger",
            message: res.data.message,
            status: res.data.action,
          });
        }
        if (res.data.action === "codeMatch") {
          setMsg({
            type: "success",
            message: res.data.message,
            status: res.data.action,
          });

          navigate("/login");
        }
      })
      .catch(error => {
        setMsg({
          type: "danger",
          message: "Data error, try again",
          status: "dataError",
        });
        console.log(error);
      });
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-main-cont">
          <div className="auth-content">
            <div className="auth-container-content">
              {/* <ToastContainer/> */}
              <div className="auth-form-box login-form">
                <div className="logo-box">
                  <img src={authlogo} alt="" />
                </div>
                <div className="alert-box">
                  {/* {
              msg.status &&<> <h6 className={`alert alert-${msg.type}`}> {msg.message} <span onClick={alertClose}>X</span></h6> </>
            } */}
                  {msg.status === "vCode" && (
                    <>
                      {" "}
                      <h6 className={`alert alert-${msg.type}`}>
                        {" "}
                        {msg.message} <span onClick={alertClose}>X</span>
                      </h6>{" "}
                    </>
                  )}
                  {msg.status === "dataError" && (
                    <>
                      {" "}
                      <h6 className={`alert alert-${msg.type}`}>
                        {" "}
                        {msg.message} <span onClick={alertClose}>X</span>
                      </h6>{" "}
                    </>
                  )}
                  {msg.status === "codeError" && (
                    <>
                      {" "}
                      <h6 className={`alert alert-${msg.type}`}>
                        {" "}
                        {msg.message} <span onClick={alertClose}>X</span>
                      </h6>{" "}
                    </>
                  )}
                </div>
                {/*phone input form */}
                <div className="input-form">
                  {formview === "phone" && (
                    <>
                      <form onSubmit={sendVerifyCode}>
                        <div className="inp-box">
                          <label htmlFor="auth_fild" className={inpDcon.authL}>
                            Phone
                          </label>
                          <input value={input.auth} onChange={handleInput} id="auth_fild" className={inpDcon.authI} name="auth" type="text" />
                        </div>
                        <input className="submit-btn " type="submit" value="Get Code" />
                      </form>
                    </>
                  )}
                  {/* Verify code input form  */}
                  {formview === "vCode" && (
                    <>
                      <form onSubmit={verifyPhoneCode}>
                        <div className="inp-box">
                          <label htmlFor="auth_fild" className={inpDcon.codeL}>
                            Enter code
                          </label>
                          <input value={input.code} onChange={handleInput} id="auth_fild" className={inpDcon.codeI} name="code" type="text" />
                        </div>
                        <input className="submit-btn " type="submit" value="Submit" />
                      </form>
                    </>
                  )}
                  {/* resend vefify link */}
                  {formview === "reSendLink" && (
                    <>
                      <form onSubmit={sendVerifyCode}>
                        <div className="inp-box">
                          <label htmlFor="auth_fild" className={inpDcon.authL}>
                            Enter Email
                          </label>
                          <input value={input.auth} onChange={handleInput} id="auth_fild" className={inpDcon.authI} name="auth" type="text" />
                        </div>
                        <input className="submit-btn " type="submit" value="Get  Link" />
                      </form>
                    </>
                  )}
                </div>

                <div className="divider-or">OR</div>

                <div className="account-with">
                  <div className="account-with-btn ">
                    <a href="/">
                      <button className="btn btn-sm ">
                        {" "}
                        <div className="text">
                          {" "}
                          <AiFillFacebook /> Log in with Facebook
                        </div>
                      </button>
                    </a>
                  </div>
                </div>

                <div className="forgot-pass">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              </div>

              <div className=" if-account-or-not">
                <span>
                  <h5 className="">
                    Don't have an account? <Link to={"/register"}>Sign up</Link>
                  </h5>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-footer">
        <AuthFooter />
      </div>
    </>
  );
};

export default VerifyMobile;
