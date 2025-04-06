/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const AuthContext = React.createContext({
  signIn: (
    email: string,
    password: string,
    callback: (status: boolean, data: any) => void,
  ) => {},
  signOut: (callback: (status: boolean, data: any) => void) => {},
  signUp: (
    email: string,
    password: string,
    callback: (status: boolean, data: any) => void,
  ) => {},
});

const useAuth = () => React.useContext(AuthContext);

export {useAuth, AuthContext};
