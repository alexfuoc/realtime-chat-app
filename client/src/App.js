import React, { Component } from "react";
import "./App.css";
import {
  Grid,
  Button,
  CssBaseline,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
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

  handleSubmit(event) {
    this.props.callAPI();
    alert(
      "A username was submitted: " +
        this.state.username +
        ", An email was submitted: " +
        this.state.email +
        ", A password was submitted: " +
        this.state.password
    );
    event.preventDefault();
  }

  render() {
    return (
      <Grid container direction="column" justify="center" spacing={10}>
        <form onSubmit={this.handleSubmit}>
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
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { apiResponse: "" };
    // this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    let params = {
      email: "test3@gmail.com",
      username: "username_here",
      password: "hunter2",
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
    const { apiResponse } = this.state;

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
              >
                <Button
                  onClick={() => {
                    alert("clicked log in");
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    alert("clicked Register");
                  }}
                >
                  Register
                </Button>
              </Grid>
              <p>{apiResponse}</p>
              <SignupForm
                callAPI={this.callAPI}
                apiResponse={this.props.apiResponse}
              />
            </header>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
