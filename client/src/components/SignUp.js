import React, { useState } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'

function SignUp({setIsAuth}){
    const [user, setUser]=useState(null)
    
    //const cookies=new Cookies()
    const signUp=()=>{
        Axios.post('http://localhost:3001/signup',user,{ withCredentials: true }).then((res)=>{
            const {token,userId,firstName,lastName,username,hashedPassword}=res.data
            Cookies.set('token',token,{ path: '/' })
            Cookies.set('userId',userId,{ path: '/' })
            Cookies.set('username',username)
            Cookies.set('firstName',firstName)
            Cookies.set('lastName',lastName)
            Cookies.set('hashedPassword',hashedPassword)
            setIsAuth(true)

        })
    }

    return(
        <div className='signUp'>
            <label>Sign Up</label>
            <input placeholder='First Name' onChange={(e)=>{
                setUser({...user, firstName: e.target.value})
            }}/>
            <input placeholder='Last Name' onChange={(e)=>{
                setUser({...user, lastName: e.target.value})
            }}/>
            <input placeholder='Username' onChange={(e)=>{
                setUser({...user, username: e.target.value})
            }}/>
            <input placeholder='Password' onChange={(e)=>{
                setUser({...user, password: e.target.value})
            }}/>
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}

export default SignUp