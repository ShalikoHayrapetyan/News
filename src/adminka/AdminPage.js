
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './admin.css';
import SignIn from "./SignIn";
import Dashboard from './Dashboard';
import { auth } from '../App';


function AdminPage() {
  const localAdminRole = useSelector(state => state.authReducer.role);
  return (
    <div>
      {localAdminRole==="admin" ? <Dashboard /> : <SignIn />}
    </div>
  );

}
export default AdminPage