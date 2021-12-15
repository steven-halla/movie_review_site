import React, {FC, useState} from 'react';
import {User} from "../model/User";

interface UserContextState {
  user?: User;
  setUser: (user?: User) => void;

  users: User[];
  setUsers: (users: User[]) => void;
}

export const UserContext = React.createContext({} as UserContextState);

export const UserContextProvider: FC = (props) => {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  return (
    <UserContext.Provider
      value={{
        user, setUser,
        users, setUsers
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};



