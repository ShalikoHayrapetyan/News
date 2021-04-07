import React from 'react';
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


    return (
        <div className="headerNav">
            <div className="container">
                <div className="headerNav__top">
                    <h2 className="logo">Best news</h2>

                    <div className="headerNav__user">
                        <Button variant="outlined" color="primary">
                            Sign In
                        </Button>
                        {/* <div>
                            user@gmail.com
                            <Button size="small" variant="outlined" color="secondary" className={classes.logout}>
                                Sign out
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="header__botom">
                    <nav className="navBar">
                    <Link to="/news" >News</Link>
                        <a href="#">Sport</a>
                        <a href="#">Culture</a>
                        <a href="#">Politics</a>
                        <a href="#">Medicine</a>
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