import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./../RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { auth, db } from "../../App";

class CreateUserForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfrim: "",
    hidePassword: true,
    error: "",
    errorOpen: false,
  };

  errorClose = (e) => {
    this.setState({
      errorOpen: false,
    });
  };

  handleChange = (text) => (e) => {
    this.setState({
      [text]: e.target.value,
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfrim;

  validateEmail = (email) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return mailformat.test(String(email).toLowerCase());
  };

  showPassword = () => {
    this.setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "" || this.state.name === "") {
      return false;
    }
    return true;
  };

  submitRegistration = (e) => {
    e.preventDefault();

    if (!this.validateEmail(this.state.email)) {
      this.setState({
        errorOpen: true,
        error: "Wrong Email addres",
      });
      return;
    }

    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Passwords don't match",
      });
      return;
    }
    const newUserCredentials = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfrim: this.state.passwordConfrim,
    };

    auth
      .createUserWithEmailAndPassword(
        newUserCredentials.email,
        newUserCredentials.password
      )
      .then((userCredential) => {
        db.collection("users").doc(userCredential.user.uid).set({
          userName: newUserCredentials.name,
          userEmail: newUserCredentials.email,
          role: "user",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <div
            className="closeBtn"
            onClick={() => this.props.setisSignUp(false)}
          >
            X
          </div>
          <h2>Sign Up</h2>
          <form
            className={classes.form}
            onSubmit={() => this.submitRegistration}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("email")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                name
              </InputLabel>
              <Input
                name="name"
                type="text"
                autoComplete="name"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("name")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("password")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                name="passwordConfrim"
                autoComplete="passwordConfrim"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                onChange={this.handleChange("passwordConfrim")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitRegistration}
            >
              Sign Up
            </Button>
          </form>

          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default connect()(withStyles(register)(CreateUserForm));