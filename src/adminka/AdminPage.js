
import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from "./SignIn";


function AdminPage() {
  const isAdmin = useSelector(state => state.authReducer.isAdmin)
  return (
    <div>
     { isAdmin ? <h1>YESSSSSS</h1> : <SignIn />} 
    </div>

  );

}
export default AdminPage