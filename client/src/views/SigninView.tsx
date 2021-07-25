import React, {ChangeEvent, FC, useContext, useState} from "react";
// import {isEmail} from "validator";
import {signin} from "../services/auth.service";
import {SignInRequest} from "../model/User";
import {Button, TextField} from "@material-ui/core";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";
import {Alert, AlertTitle} from '@material-ui/lab';
import {getCurrentUserAuth} from "../services/getCurrentUserAuth";
import {getUser} from "../services/user.service";
import {UserContext} from "../services/user.context";

export const RouterlessSigninView: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {setUser} = useContext(UserContext);
  const [signInRequest, setSignInRequest] = useState<SignInRequest>({} as SignInRequest);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      email: event.target.value
    });

    if (!event.target.value) {
      setEmailError("");

    } else if (event.target.value.length < 2) {
      setEmailError("Email must be 2 + characters");

    } else {
      setEmailError("");
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setSignInRequest({
      ...signInRequest,
      password: event.target.value
    });

    if (!event.target.value) {
      setPasswordError("");

    } else if (event.target.value.length < 2) {
      setPasswordError("Password must be 2+ characters");

    } else {
      setPasswordError("");
    }
  };

  const handleSignIn = () => {
    setMessage("");
    setLoading(true);

    signin(signInRequest).then(response => {

      // fetch user, and set user state, then redirect to / (movies listing page)
      const userAuth = getCurrentUserAuth();
      if (userAuth != null) {
        getUser(userAuth.id).then(authedUser => {
          setUser(authedUser.data);
        })
          .finally(() => {
            history.push("/");
          });
      }

    }, (error: any) => {
      const errorMessage = parseErrorMessageFromErrorResponse(error);

      setLoading(false);
      setMessage(errorMessage);
    });
  }

  const parseErrorMessageFromErrorResponse = (error: any): string => {
    return (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString()
  }

  return (
    <div>
      <div className="loginbox">
        {/* migrate away from onSubmit and forms and just have a button down blow with and onClick={handleSignin}*/}

        <div className="form-group">
          <label htmlFor="email"> </label>
          {/*value={email} we took this out from inline input tag*/}
          <TextField id="outlined-basic"
                     label="Email"
                     variant="outlined"
                     type="text"
                     name="email"
                     onChange={onChangeEmail}
                     className="form-control"
          />
          {emailError && (
            <Alert severity="error">
              <AlertTitle>{emailError} </AlertTitle>
            </Alert>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password"> </label>
          <TextField id="outlined-basic"
                     label="password"
                     variant="outlined"
                     type="password"
                     name="password"
                     className="form-control"
                     onChange={onChangePassword}/>

          {passwordError && (
            <Alert severity="error">
              <AlertTitle>{passwordError} </AlertTitle>
            </Alert>
          )}
        </div>
        <div className="form-group">
          <Button variant="contained"
                  color="primary"
                  onClick={handleSignIn}
                  className="btn btn-primary btn-block"
                  disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"/>
            )}
            <span>Sign In</span>
          </Button>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger"
                 role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export const SigninView = withRouter(RouterlessSigninView);


//auth.services line 29 what type should signinrequest be?
//signinview lines 146 and 156 both havea  signin button, which should i keep?
//signinview unused parameters on handle signin line 92
