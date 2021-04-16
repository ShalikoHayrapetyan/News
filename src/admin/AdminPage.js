
import React from 'react';
import { useSelector } from 'react-redux';
import './admin.css';
import AdminSignIn from "./forms/AdminSignIn";
import Dashboard from './Dashboard';


function AdminPage() {
  const localAdminRole = useSelector(state => state.authReducer.role);

  return (
    <div>
      {localAdminRole === "admin" ? <Dashboard /> : <AdminSignIn />}
    </div>
  );

}
export default AdminPage