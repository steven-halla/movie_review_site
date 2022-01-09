import React, {FC, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getUsers} from "../services/user.service";
import {UserContext} from "../services/user.context";
import {AxiosResponse} from "axios";
import {User} from "../model/User";
import {Box, Grid, Paper} from "@material-ui/core";
import styled from "styled-components";

const CriticListDiv = styled.div`
  &.critic-view {
    max-width: 800px;
    margin: auto;
    //background-color: #eeeeee;
    //  background-color: chocolate;
    display: inline-flex;
    //flex-direction: row;
    flex-flow: row;
    margin: auto;
    min-width: 220px;
  }

  //.critic-list {
  //  margin: 10px;
  //    //flex-flow: row;
  //    flex-direction: row;
  //
  //}
  //
  //ul li {
  //  margin: auto;
  //  list-style-type: none;
  //  color: red;
  //  margin-right: 37px;
  //}
  .critics-list {
    //background-color: blue;
    margin: 5px;
    min-width: 255px;
    //background-color: red;


    .critic-paper {
      margin: auto;
      margin: 5px;
      align-items: center;

      min-width: 240px;
      //min-height: 100px;
      display: flex;
      //border-color: #282c34;
      //background-color: blue;

      &:hover {
        background-color: ghostwhite;

      }

      .item-box {
        display: flex;
        //align-content: flex-start;
        align-items: center;
        //margin-left: auto;
        //flex-direction: column;
        flex-flow: column;
        align-items: center;
        margin-left: 70px;
        //min-height: 122px;
      }
    }
  }

`;

export const CriticList: FC = () => {
  const {users, setUsers} = useContext(UserContext);

  useEffect(() => {
    getUsers()
      .then((response: AxiosResponse<User[]>) => {
        setUsers(response.data);
      });

  }, []);

  return (
    <CriticListDiv className="critic-view">
      <div>
        {users.map((user, index) => (
          <CriticUser key={index} user={user}/>
        ))}
      </div>
    </CriticListDiv>
  );
};

interface CriticUserProps {
  user: User;
}

const CriticUser: FC<CriticUserProps> = (props) => {
  const {user} = props;
  return (
    <CriticListDiv className="critic-view">

      <Link to={`/critics/${user.id}`}>
        <Grid container spacing={1} className="critics-list">
          <Paper elevation={3} className="critic-paper">
            <section className="item-section">
              <Box className="item-box">
                <p>{user.displayName}</p>
              </Box>
            </section>
          </Paper>
        </Grid>
      </Link>
    </CriticListDiv>
  );
}
