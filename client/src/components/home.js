import React, { Component } from "react";
import { Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import LoginForm from "./login";
import SignupForm from "./signUp";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
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
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </Grid>
              </Grid>
            </header>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}
