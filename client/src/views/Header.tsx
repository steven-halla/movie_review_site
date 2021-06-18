import React, {FC, useContext} from 'react';
import {isLoggedIn} from "../services/auth.service";
import {Link, withRouter} from "react-router-dom";
import {UserContext} from "../services/user.context";
import styled from "styled-components";
import {RouteComponentProps} from "react-router";
import clsx from "clsx";

const StyleHeaderDiv = styled.div`
  &.top-header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    .links {
      width: 100%;
      height: 100%;
      max-width: 800px;
      background-color: #eee;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;

      .link {
        margin: 10px;
        height: 100%;
        line-height: 50px; // set line-height = height of container (50px) and this will vertically center text.
        &:hover {
          border-bottom: 2px solid black;
        }
      }

      .selected {
        border-bottom: 2px solid black;
      }
    }

    a,
    a:visited,
    a:hover {
      text-decoration: none;
      color: black;
    }
  }
`;

const RouterlessHeader: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {user} = useContext(UserContext);

  const pathname = history.location.pathname;

  if (isLoggedIn() && user != null) {
    return (
      <StyleHeaderDiv className="top-header">
        <div className="links">
          <Link
            className={clsx("link", pathname.startsWith('/critics') && 'selected')}
            to="/critics"
          >
            Critics
          </Link>
          <Link
            className={clsx("link", pathname.startsWith('/movies') && 'selected')}
            to="/movies"
          >
            Movies
          </Link>
          <Link
            className={clsx("link", pathname === '/' && 'selected')}
            to="/"
          >
            Home
          </Link>
          <Link
            className={clsx("link", pathname.startsWith('/profile') && 'selected')}
            to="/profile"
          >
            {user.displayName || user.email || 'Profile'}
          </Link>
        </div>
      </StyleHeaderDiv>
    );
  }
  return (
    <StyleHeaderDiv className="top-header">
      <div className="links">
        <Link className={clsx("link", pathname === '/signin' && 'selected')} to={"/signin"}>Sign In</Link>
        <Link className={clsx("link", pathname === '/signup' && 'selected')} to={"/signup"}>Sign Up</Link>
      </div>
    </StyleHeaderDiv>
  )
}

export const Header = withRouter(RouterlessHeader);

