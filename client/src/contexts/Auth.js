import React from "react";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    this.setState({
      isLoggedIn: true,
      user: user,
    });
  }

  logout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthConsumer, AuthProvider };
