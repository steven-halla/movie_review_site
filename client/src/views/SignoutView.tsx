import React, {FC, useContext, useEffect} from "react";
import {signout} from "../services/auth.service";
import {UserContext} from "../services/user.context";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";

const RouterlessSignoutView: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    setUser(undefined);
    signout();
    history.replace("/signin");
  }, []);

  return null;
}

export const SignoutView = withRouter(RouterlessSignoutView);
