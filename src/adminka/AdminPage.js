
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './admin.css';
import SignIn from "./SignIn";
import Dashboard from './Dashboard';
import { auth } from '../App';


function AdminPage() {
  const localAdminEmail = useSelector(state => state.authReducer.adminEmail);
  return (
    <div>
      {localAdminEmail ? <Dashboard /> : <SignIn />}
    </div>
  );

}
export default AdminPage