import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth, db } from "../../App";
import LinearIndeterminate from "./../Loading";
import { Redirect } from "react-router";
import { Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 300,
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputs: {
    display: "block",
    width: "100%",
    height: "38px",
    marginBottom: "8px",
  },
}));

export default function AdminSignIn() {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLoading = false;

  const handleSignInAdmin = (e) => {
    e.preventDefault();

    let role = "";

    db.collection("users")
      .where("userEmail", "==", login)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          throw new setError("Wrong email or password!!!");
        }
        querySnapshot.forEach((doc) => {
          role = doc.data().role;

          if (role === "admin") {
            auth
              .signInWithEmailAndPassword(login, password)
              .then((userCredential) => {})
              .catch((error) => {
                console.log(error.message);
                setError("Wrong email or password!!!");
              });
          } else alert("Sorry but yor aren't admin");
        });
      })
      .catch((error) => {
        setError("Wrong email or password!!!");
      });
  };

  if (isLoading) return <LinearIndeterminate />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome Admin
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignInAdmin}>
          <input
            className={classes.inputs}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            className={classes.inputs}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {error && <span>{error}</span>}
        </form>
      </div>

      <Switch>
        <Redirect to="/admin" />
      </Switch>
    </Container>
  );
}
