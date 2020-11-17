import React, { Component } from "react";
import "../App.css";
import { Grid, Button, TextField } from "@material-ui/core";
import LoginForm from "./login";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      apiResponse: null,
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

  handleSubmit(event) {
    this.callAPI(this.state.email, this.state.username, this.state.password);
    event.preventDefault();
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
      .then((body) => {
        try {
          return JSON.parse(body);
        } catch {
          return { error: "Error: Try again" };
        }
      })
      .then((res) => {
        if (res.error) this.setState({ apiResponse: res.error });
        else {
          this.setState({ apiResponse: res.message });

          fetch("http://localhost:3001/login/", {
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
      });
  }

  render() {
    const { apiResponse } = this.state;

    return (
      <div className="App">
        <h2 className="title">Chatty Dorothy's</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            {apiResponse ? <p>{apiResponse}</p> : <p>Sign Up</p>}
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
                id="outlined-username"
                name="username"
                label="Username"
                value={this.state.username}
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
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default SignupForm;
