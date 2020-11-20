import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginForm from "./components/login";
import SignupForm from "./components/signUp";
import Chat from "./components/chatbox";
import Home from "./components/home";
import { AuthProvider, AuthConsumer } from "./contexts/Auth";
import chatbox from "./components/chatbox";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isLoggedIn }) => (
      <Route
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: "",
      loginState: false,
      signUpState: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <AuthProvider>
        <Chat />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <ProtectedRoute component={Chat} path="/chat" />
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
