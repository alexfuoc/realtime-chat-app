import React, { Component } from "react";
import "./App.css";
import { Grid, Button, CssBaseline } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { apiResponse: "" };
    // this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:3001/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

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
            </header>
          </div>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

export default App;
