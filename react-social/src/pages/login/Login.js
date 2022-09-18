/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    // const email = useRef()
    // const password = useRef()
    // const { user, isFetching, error, dispatch } = useContext(AuthContext)
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     loginCall({email:email.current.value, password: password.current.value}, dispatch)
    //     console.log('user login',user)
    // }
    const navigate = useNavigate()
    const moveToRegister = () => {
        navigate('/register')
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        email:'',
        password:''
    })

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault()
        axios.post('http://localhost:8800/api/auth/login',{
            email:form.email,
            password:form.password
        })
        .then((res) => {
            setIsLoading(false)
            const result = res.data
            const token = result.token
            console.log('RESULT LOGIN : ', result, 'TOKEN : ', token)
            localStorage.setItem('auth', 1)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(result.payload))
            navigate('/')
        })
        .catch((err) => {
            setIsLoading(false)
            console.log('ERROR LOGIN',err)
        })
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
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input className="loginInput"
                    placeholder='Email'
                    required type="email"
                    name='email'
                    value={form.email}
                    onChange={handleForm}
                    />
                    <input className="loginInput"
                    placeholder='Password'
                    required minLength='6'
                    type="password"
                    name='password'
                    value={form.password}
                    onChange={handleForm}
                    />
                    <button className="loginButton" type='submit' disabled={isLoading} >
                        {isLoading ? <CircularProgress color="inherit" size='20px'/> : 'Login'}
                    </button>
                    <span className="loginForgot">Forgot Password ?</span>
                    <button className="loginRegisterButton" onClick={moveToRegister}>Create a New Account</button>
                </form>
            </div>
            {/* <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder='Email' required type="email" className="loginInput" ref={email}/>
                    <input placeholder='Password' required minLength='6' type="password" className="loginInput" ref={password}/>
                    <button className="loginButton" type='submit' disabled={isFetching}>
                        {isFetching ? <CircularProgress color="inherit" size='20px'/> : 'Login'}
                    </button>
                    <span className="loginForgot">Forgot Password ?</span>
                    <button className="loginRegisterButton" onClick={moveToRegister}>Create a New Account</button>
                </form>
            </div> */}
        </div>
    </div>
  )
}

export default Login