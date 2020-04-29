import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../firebase/config';
import { Auth } from '../context/AuthContext';


const Nav = (props) => {

  const [userState, setUserState] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const { state, dispatch } = React.useContext(Auth);

  useEffect(() => {
    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
        setUserEmail(user.email);
      }
    });
  });

  const logout = () => {
    firebase.logout();
    setUserState(null);
    props.history.replace("/");
    return dispatch({
      type: "LOGOUT",
      payload: {}
    });
  }

  let buttons;
  if (userState != null || state.user.hasOwnProperty("user")) {
    buttons = (<React.Fragment>
      <li><Link to="/create">NEW</Link></li>
      <li>{userEmail}</li>
      <li><button className="logout" onClick={logout}>LogOut</button></li>
    </React.Fragment>)
  } else {
    buttons = (
      <React.Fragment>
        <li><p>Guest</p></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">LogIn</Link></li>
      </React.Fragment>
    )
  }
  return (
    <nav>
      <ul>
        <li ><Link to="/">HOME</Link></li>
      </ul>
      <ul>
        {buttons}
      </ul>
    </nav>

  )
}

export default withRouter(Nav);