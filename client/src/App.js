import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/login";
import SignupForm from "./components/signUp";
import Home from "./components/home";
import io from 'socket.io-client';

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

  componentDidMount() {
    var socket = io();
    socket.on('chat message', msg =>{
      console.log(msg);
    })
    socket.emit('chat message', 'Hello world! This is a chat message');
  }

  render() {
    return (
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
        </Switch>
      </Router>
    );
  }
}

export default App;
