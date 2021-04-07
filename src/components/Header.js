import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import CreateUserForm from '../adminka/CreateUserForm';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    logout: {
        marginLeft: "10px",
    }
}));

const Header = () => {
    const classes = useStyles();
    const [isSignIn, setisSignIn]=useState(false)
    const localUserEmail = useSelector(state => state.authReducer.adminEmail);
    const categoriesData = useSelector(state => state.fireBaseData.categoryData);

    const dispatch = useDispatch();

    useEffect(() => {
        db.collection("categories")
            .get()
            .then((querySnapshot) => {
                const all = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    all.push(doc.data())
                });
                dispatch({
                    type: 'setCatgeoryData',
                    payload: {
                        data:all
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [])

    console.log(categoriesData)


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
        <div className="headerNav">
            <div className="container">
                <div className="headerNav__top">
                    <h2 className="logo">Best news</h2>

                    <div className="headerNav__user">
                        { localUserEmail ? <div>
                           { localUserEmail}
                            <Button size="small" variant="outlined" color="secondary" onClick={handleLogout} className={classes.logout}>
                                Sign out
                            </Button>
                        </div> : isSignIn ? <CreateUserForm /> : (
                              <Button variant="outlined" color="primary" onClick={()=>setisSignIn(true)}>
                            Sign In/Up
                        </Button>
                        )
                        }
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="header__botom">
                    <nav className="navBar">
                    <Link to="/news" >News</Link>
                    {categoriesData && categoriesData.map(el => <Link key={el.id}  to={`/${el.title}` }>{el.title}</Link>) }
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