import React, { Component } from "react";
import "./App.css";
import { Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import LoginForm from "./components/login";
import SignupForm from "./components/signUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: "",
      loginState: false,
      signUpState: false,
    };
    this.callAPI = this.callAPI.bind(this);
    this.handleLoginClick = this.handleLoginClick(this);
    this.handleSignUpClick = this.handleSignUpClick(this);
  }

  handleLoginClick() {
    this.setState({ loginState: true });
  }

  handleSignUpClick() {
    this.setState({ signUpState: true });
  }

  callAPI(email, username, password) {
    let params = {
      email,
      username,
      password,
    };

    fetch("http://localhost:3001/login/signup/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  }

  componentDidMount() {}

  render() {
    const { apiResponse, loginState, signUpState } = this.state;

    return (
      <React.Fragment>
        <CssBaseline>
          <div className="App">
            <header className="App-header">
              <h2 className="title">Chatty Dorothy's</h2>
              <p className="eggplant">Are you a friend of Dorothy?</p>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Button onClick={this.handleLoginClick}>Login</Button>
                </Grid>
                <Grid item>
                  <Button onClick={this.handleSignUpClick}>Sign Up</Button>
                </Grid>
              </Grid>
            </header>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <SignupForm />
              </Grid>
              <Grid item>
                <LoginForm />
              </Grid>
            </Grid>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
