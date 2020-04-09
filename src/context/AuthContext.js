import React from 'react';

// Reducer
import { firebaseAuth } from '../reducers/AuthReducer'

export const Auth = React.createContext();
const initialState = {
    user: {}
}

export const AuthProvider = (props) => {
    const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
    const value = {state, dispatch};

    return <Auth.Provider value={value}>
        {props.children}
    </Auth.Provider>
}