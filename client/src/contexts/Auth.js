import React from "react";

const { Consumer, Provider } = React.createContext({
  isLoggedIn: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export const AuthConsumer = Consumer;
export const AuthProvider = Provider;
