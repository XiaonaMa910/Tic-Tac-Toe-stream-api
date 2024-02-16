import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Axios from 'axios'

function Login({setIsAuth}){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const login=()=>{
        Axios.post('http://localhost:3001/login',{username,password}).then((res)=>{
            const {token,userId,firstName,lastName,username}=res.data
            Cookies.set('token',token,{ path: '/' })
            Cookies.set('userId',userId,{ path: '/' })
            Cookies.set('username',username)
            Cookies.set('firstName',firstName)
            Cookies.set('lastName',lastName)
            Cookies.set('test','123')
            setIsAuth(true)

        })
    }
    
    
    
    return(
        <div className='login'>
            <label>login</label>
            
            <input placeholder='Username' onChange={(e)=>{
                setUsername( e.target.value)
            }}/>
            <input placeholder='Password' onChange={(e)=>{
                setPassword( e.target.value)
            }}/>
            <button onClick={login}>Login</button>
            
            
        </div>
    )
}

export default Login