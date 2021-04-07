import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../App"
const Header = () => {
    const localAdminEmail = useSelector(state => state.authReducer.adminEmail);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch({
            type: 'isAuthenticating',
            payload:true 
        });
        auth.signOut()
        dispatch({
            type: 'signOut',
        });

    }

    return (
        <div className="header">
            <h5>Login `  {localAdminEmail}</h5>
            <h2>Admin Panel</h2>
            <span className="logout" onClick={handleLogout}>Logout</span>
        </div>
    )
}

export default Header;