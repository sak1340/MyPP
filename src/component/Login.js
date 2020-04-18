import React, { useState } from 'react'
import firebase from '../firebase/config'
import { Auth } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [routeRedirect, setRouteRedirect] = useState(false)
    const {state, dispatch} = React.useContext(Auth)

    const login = async(e) => {
        e.preventDefault();
        let response = await firebase.login(email,password)
        if(response.hasOwnProperty("message")){
            console.log(response.message);
        }else{
            setRouteRedirect(true);
            return dispatch({
                type: "LOGIN",
                payload: response.user
            })
            
        }
    }
    const redirect = routeRedirect
    if(redirect){
        return <Redirect to="/" />
    }

    return(
        <React.Fragment>
            <form onSubmit={login}>
                <p>LOGIN</p>
                <label htmlFor="email">EMAIL</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">PASSWORD</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="LOGIN" />
            </form>
        </React.Fragment>
    )
}

export default Login
