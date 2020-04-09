import React, { useState } from 'react';
import firebase from '../firebase/config';
import { Auth } from '../context/AuthContext';

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = React.useContext(Auth);

    const signup = async (e) => {
        console.log(state);
        
        e.preventDefault();

        let response = await firebase.signup(email, password);
        if (response.hasOwnProperty("message")) {
            console.log(response.message);
        } else {
            console.log(response.user);
            return dispatch({
                type: "SIGNUP",
                payload: response
            })
        }
    }


    return (
        <React.Fragment>
            <form onSubmit={signup}>
                <p>Create</p>
                <label htmlFor="email">EMAIL</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">PASSWORD</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" value="Create account" />
            </form>
        </React.Fragment>
    )
}

export default Signup;