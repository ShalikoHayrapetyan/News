import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import CreateUserForm from '../adminka/CreateUserForm';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../App';
import UserSignInForm from '../adminka/UserSignInForm';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    logout: {
        marginLeft: "10px",
    },
    btns: {
        marginRight: "8px",
    },

}));

const Header = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isSignIn, setisSignIn] = useState(false)
    const [isSignUp, setisSignUp] = useState(false)
    const localUserEmail = useSelector(state => state.authReducer.adminEmail);
    const categoriesData = useSelector(state => state.fireBaseData.categoryData);

    const handleLogout = () => {
        dispatch({
            type: 'isAuthenticating',
            payload: true
        });
        auth.signOut()
        dispatch({
            type: 'signOut',
        });

    }

    return (
        <div className="headerNav">
            <div className="container">
                <div className="headerNav__top">
                    <h2 className="logo">Best news</h2>

                    <div className="headerNav__user">
                        {localUserEmail ?
                            <div>
                                {localUserEmail}
                                <Button size="small" variant="outlined" color="secondary" onClick={handleLogout} className={classes.logout}>
                                    Sign out
                            </Button>
                            </div> : isSignIn ?
                                <UserSignInForm setisSignIn={setisSignIn} />
                                : isSignUp ? <CreateUserForm setisSignUp={setisSignUp} />
                                    : (<>
                                        <Button className={classes.btns} variant="outlined" color="primary" onClick={() => setisSignIn(true)}>
                                            Sign In
                                                    </Button>
                                        <Button className={classes.btns} variant="outlined" color="primary" onClick={() => setisSignUp(true)}>
                                            Sign Up
                                                   </Button>
                                    </>)
                        }
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="header__botom">
                    <nav className="navBar">
                        <Link to="/News" >All News</Link>
                        {categoriesData.map(el => <Link key={el.id} to={`/${el.title}`}>{el.title}</Link>)}
                    </nav>
                    <div className="date">
                        {new Date().toDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;