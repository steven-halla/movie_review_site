import React, {ChangeEvent, FC, useContext, useState} from 'react';
import {signup} from "../services/auth.service";
import {UserContext} from "../services/user.context";
import {Box, Button, TextField} from "@material-ui/core";
import styled from "styled-components";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";
import {Alert, AlertTitle} from '@material-ui/lab';


const SignUpViewDiv = styled.div`
  &.signupbox {
    background-color: #eeeeee;
    width: 400px;

    padding: 10px;
    border-radius: 25px;
    color: red;
    max-width: 800px;
    margin: auto;
  }

  .email-input {
    
    margin-right: auto;
    color: blue;
  }

  .page-wrap {
    background-color: #282c34;
  }
`;

const RouterlessSignupView: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {user, setUser} = useContext(UserContext);

  const [emailError, setEmailError] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value =', event.target.value)
    // @ts-ignore
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (!event.target.value) {
      setEmailError("");

    } else if (event.target.value.length < 2) {
      setEmailError("Email must be 2 + characters + proper email type");
      history.push("/signup");


    } else {
      setEmailError("");
    }
  };

  const onChangeDisplayName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (!event.target.value) {
      setDisplayNameError("");

    } else if (event.target.value.length < 2 ) {
      setDisplayNameError("User name must be 2 + characters");
      history.push("/signup");


    } else {
      setDisplayNameError("");
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (!event.target.value) {
      setPasswordError("");

    } else if (event.target.value.length < 2) {
      setPasswordError("Password must be 2+ characters");
      history.push("/signup");
    } else {
      setPasswordError("");
    }
  };

  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (!event.target.value) {
      setConfirmPasswordError("");

    } else { // @ts-ignore
      if (event.target.value !== user.password) {
        setConfirmPasswordError("Password and confirm must match")
        history.push("/signup");

      } else {
        setConfirmPasswordError("");
      }
    }
    // @ts-ignore
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = () => {
    // @ts-ignore
    signup(user.email, user.password, user.displayName).then(response => {
      // check response for error;

      history.push("/signin");
    });
  }

  return (
    <Box className="page-wrap">
      <SignUpViewDiv className="signupbox">
        <Box>
          <Box className="email-input">
            <label htmlFor="email"/>
            <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email"
                       onChange={onChangeEmail}/>
            {emailError && (
              <Alert severity="error">
                <AlertTitle>{emailError} </AlertTitle>
              </Alert>
            )}
          </Box>

          <Box>
            <label htmlFor="displayName"/>
            <TextField id="outlined-basic" label="DisplayName" variant="outlined" type="text"
                       name="displayName" onChange={onChangeDisplayName}/>
            {displayNameError && (
              <Alert severity="error">
                <AlertTitle>{displayNameError} </AlertTitle>
              </Alert>
            )}
          </Box>

          <Box>
            <label htmlFor="password"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                       name="password" onChange={onChangePassword}/>
            {passwordError && (
              <Alert severity="error">
                <AlertTitle>{passwordError} </AlertTitle>
              </Alert>
            )}
          </Box>

          <Box>
            {/*I might need to change confirm password in htmlFor and name to password if it breaks.*/}
            <label htmlFor="confirmPassword"/>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password"
                       name="confirmPassword" onChange={onChangeConfirmPassword}/>
            {confirmPasswordError && (
              <Alert severity="error">
                <AlertTitle>{confirmPasswordError} </AlertTitle>
              </Alert>
            )}
          </Box>

          <Button variant="contained" color="primary" onClick={handleSignup}>
            Create User
          </Button>
        </Box>
      </SignUpViewDiv>
    </Box>
  );
}

export const SignupView = withRouter(RouterlessSignupView);
