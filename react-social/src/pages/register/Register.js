import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordConfirmation = useRef()
    const navigate = useNavigate()

    const moveToLogin = () => {
        navigate('/login')
    }

    const handleClick = async (e) => {
        e.preventDefault()
        if(passwordConfirmation.current.value !== password.current.value){
            passwordConfirmation.current.setCustomValidity('Passwords does not match')
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user)
                navigate('/login')
            } catch (err) {
                console.log('err register', err)
            }
        }
    }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">MySocial</h3>
                <span className="loginDesc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder='Username' type="text" required ref={username} className="loginInput" />
                    <input placeholder='Email' type="email" required ref={email} className="loginInput" />
                    <input placeholder='Password' type="password" minLength='6' required ref={password} className="loginInput" />
                    <input placeholder='Confirmation Password' minLength='6' required ref={passwordConfirmation} type="password" className="loginInput" />
                    <button className="loginButton" type='submit'>Sign Up</button>
                    <button className="loginRegisterButton" onClick={moveToLogin}>Log into your account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register