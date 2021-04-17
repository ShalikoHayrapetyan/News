import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CreateUserForm from "../admin/forms/CreateUserForm";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../App";
import UserSignInForm from "../admin/forms/UserSignInForm";
import Rate from "./Rate";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSignIn, setisSignIn] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [date, setDate] = useState(new Date());
  const localUserName = useSelector((state) => state.authReducer.adminName);
  const categoriesData = useSelector(
    (state) => state.fireBaseData.categoryData
  );

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const handleLogout = () => {
    dispatch({
      type: "isAuthenticating",
      payload: true,
    });
    auth.signOut();
    dispatch({
      type: "signOut",
    });
  };

  return (
    <div className="headerNav">
      <div className="container">
        <div className="headerNav__top">
          <Link to="/">
            <img src="/logo.png" alt="Aca news" className="logo" />
          </Link>
          <Rate />
          <div className="headerNav__user">
            {localUserName ? (
              <div>
                <span className="user-name">{localUserName}</span>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                  className={classes.logout}
                >
                  Sign out
                </Button>
              </div>
            ) : isSignIn ? (
              <UserSignInForm setisSignIn={setisSignIn} />
            ) : isSignUp ? (
              <CreateUserForm setisSignUp={setisSignUp} />
            ) : (
              <>
                <Button
                  className={classes.btns}
                  variant="outlined"
                  color="primary"
                  onClick={() => setisSignIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  className={classes.btns}
                  variant="outlined"
                  color="primary"
                  onClick={() => setisSignUp(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header__botom">
          <nav className="navBar">
            <Link to="/News">All News</Link>
            {categoriesData.map((el) => (
              <Link key={el.id} to={`/${el.title}`}>
                {el.title}
              </Link>
            ))}
          </nav>
          <div className="date">{date.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
