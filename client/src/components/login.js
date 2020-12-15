import React, { Component } from "react";
import "../App.css";
import { Grid, Button, TextField } from "@material-ui/core";
import { AuthConsumer } from "../contexts/Auth";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  callAPI(email, password) {
    let params = {
      email,
      password,
    };

    fetch("/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.text())
      .then((res) => {
        let response = JSON.parse(res);
        console.log(response);
        this.props.login(response.user);
      });
  }

  handleSubmit(event) {
    this.callAPI(this.state.email, this.state.password);

    event.preventDefault();
  }

  render() {
    var { user } = this.props;

    return (
      <div className="App">
        <h2 className="title">Chatty Dorothy's</h2>
        <p className="eggplant">Are you a friend of Dorothy?</p>
        {user && <p>{user.username}</p>}
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <TextField
                id="outlined-email"
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
                variant="outlined"
                p={2}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-password"
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                variant="outlined"
                p={2}
              />
            </Grid>
            <Grid item>
              <Button type="submit" value="Submit">
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default (props) => (
  <AuthConsumer>
    {({ user, login, logout, isLoggedIn }) => {
      return (
        <LoginForm
          {...props}
          user={user}
          login={login}
          logout={logout}
          isLogginIn={isLoggedIn}
        />
      );
    }}
  </AuthConsumer>
);
