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

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: "",
      loginState: false,
      signUpState: false,
    };
    this.loggedIn = this.loggedIn(this);
  }

  loggedIn() {
    fetch("http://localhost:3001/authrequired", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  }

  componentDidMount() {}

  render() {
    return (
      <AuthProvider>
        <Router>
          <Chat />
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
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
