import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('isLocalAdmin');

        dispatch({
            type: 'signIn/signout',
            payload: {
                isAdmin: false,
            }
        });
    }

    return (
        <div className="header">
            <h2>Admin Panel</h2>
            <span className="logout" onClick={handleLogout}>Logout</span>
        </div>
    )
}

export default Header;