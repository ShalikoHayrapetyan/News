
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './admin.css';
import SignIn from "./SignIn";
import Dashboard from './Dashboard';


function AdminPage() {
  const isAdmin = useSelector(state => state.authReducer.isAdmin);

  let isLocalAdmin = localStorage.getItem("isLocalAdmin");

  return (
    <div>
      { (isAdmin || isLocalAdmin === 'admin') ? <Dashboard /> : <SignIn />}
    </div>
  );

}
export default AdminPage