import React, {FC, useContext, useEffect} from 'react';
import {isLoggedIn} from "../services/auth.service";
import {UserContext} from "../services/user.context";
import {getCurrentUserAuth} from "../services/getCurrentUserAuth";
import {getUser} from "../services/user.service";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";

const RouterlessLoginStateHandler: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    if (history.location) {
      if (history.location.pathname === '/signin') {
        return;
      }
      if (history.location.pathname === '/signup') {
        return;
      }
      if (history.location.pathname === '/signout') {
        return;
      }
    }

    if (!isLoggedIn()) {
      history.replace("/signin");
    }
  }, []);

  useEffect(() => {
    const userAuth = getCurrentUserAuth();
    if (userAuth != null) {
      getUser(userAuth.id).then(authedUser => {
        // console.log(authedUser);
        setUser(authedUser.data);
      });
    }
  }, []);

  return null;
}

export const LoginStateHandler = withRouter(RouterlessLoginStateHandler);
