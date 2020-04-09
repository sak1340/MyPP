import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {} from '../context/AuthContext';

const Nav = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">REACT</Link></li>
            </ul>
            <ul>
                <li><Link to="/create">NEW</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;