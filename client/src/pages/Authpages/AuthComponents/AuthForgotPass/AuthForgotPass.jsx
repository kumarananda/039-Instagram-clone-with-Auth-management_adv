
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../AuthRegister/AuthRegister.scss'
import authlogo from '../../AuthImges/authlogo.png'
import appleStore from '../../AuthImges/apple-store.png'
import playStore from '../../AuthImges/play-store.png'
import {AiFillFacebook} from 'react-icons/ai'
// import './Login.scss'
import '../AuthLogin/Login.scss'
import { useState } from 'react'
import swla from 'sweetalert'
import axios from 'axios'
import cookie from 'js-cookie'
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';
import LoaderContext from '../../../../context/LoaderContext';
import { creatToast } from '../../../../utility/toast'
import './AuthForgotPass.scss'




const AuthForgotPass = () => {


  // use navigate 
  // const navigate = useNavigate();



  // form filed state
  const [input, setInput] = useState({ auth : ''});
  // console.log(input);

  //  input design con
  const inpDcon = {
    authL : input.auth ? "cont-lavel" : '',
    authI : input.auth ? "cont-input" : ''
  }

    // handle Input data
    const handleInput = (e) => {
      // setInput({...input, [e.target.name] : e.target.value})
      setInput( (prev) => ({...prev, [e.target.name] : e.target.value}));
  
    }

    // use contex
    const { authdispatch , authstate} = useContext(AuthContext)
    
  


  return (
    <>

      <div className="auth-container-content">
          {/* <ToastContainer/> */}
        <div className="auth-form-box login-form">

          <div className="logo-box">
            <div className="box">

            </div>
          </div>
          <div className="forgot-pass-cintent">
            <h4>Trouble Logging In?</h4>
            <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
          </div>
          

          <div className="input-form">
            <form  onSubmit={"handleUserLogin"}>

              <div className="inp-box">
                <label htmlFor='auth_fild'  className={inpDcon.authL}>Email, Username or password</label>
                <input value={input.auth}  onChange={handleInput} id='auth_fild' className={inpDcon.authI} name='auth' type="text" />
              </div>

              <input className='submit-btn ' type="submit" value="Send Link"/>
            </form>
          </div>

          <div className=" m-t-30">
            <a href="#">Can't reset your password?</a>
          </div>
          
          <div className="divider-or">
            OR
          </div>

          <div className="create-acc">
            <a href="#">Create New Account</a>
          </div>
          <div className="back-login">
            <Link to="/login">Back Login</Link>
          </div>

        </div>

      
      </div>
    </>
  )
}

export default AuthForgotPass;