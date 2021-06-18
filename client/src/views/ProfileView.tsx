import React, {FC, useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../services/user.context";
import styled from "styled-components";
import {Box} from "@material-ui/core";

const ProfileViewDiv = styled.div`
  &.profile-user-view {
    max-width: 800px;
    margin: auto;
  }

  .user-info {
    color: black;
    font-size: large;
  }

  //
  //.link {
  //  margin: auto;
  //  display: block;
  //  width: 115px;
  //  height: 25px;
  //  background: #4E9CAF;
  //  padding: 10px;
  //  text-align: center;
  //  border-radius: 1px;
  //  color: white;
  //  font-weight: bold;
  //  line-height: 25px;
  //}

  .link {
    color: red;
    text-decoration: red;

    &:hover {
      font-size: x-large;
    }
  }
`;

export const ProfileView: FC = () => {
  const {user} = useContext(UserContext);

  return (
    <ProfileViewDiv className="profile-user-view">
      <Box className="user-info" mb="15px">
        <p>Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
      </Box>
      <Link className="link" to="/signout">Sign Out</Link>
    </ProfileViewDiv>
  );
};
