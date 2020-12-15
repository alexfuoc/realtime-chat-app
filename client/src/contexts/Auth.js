import React from "react";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: null,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("Inside Auth Context.. User logged in");
    console.log(user);
    this.setState({
      isLoggedIn: true,
      user: user,
    });
  }

  logout() {
    this.setState({ isLoggedIn: false, user: null });
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
