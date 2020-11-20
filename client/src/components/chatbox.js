import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import io from "socket.io-client";
import { FormHelperText } from "@material-ui/core";

const classes = (theme) => ({
  headerMessage: {
    padding: "10px",
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  bubble: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: "",
      username: Math.random(),
      socket: null,
      messages: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({ messageInput: value });
  }

  handleSubmitMessage() {
    this.state.socket.emit("chat message", {
      username: this.state.username,
      ts: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      messageContent: this.state.messageInput,
    });
  }

  recievedMessage = (msg) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, msg],
    }));
  };

  componentDidMount() {
    var socket = io();
    socket.on("chat message", (msg) => {
      console.log("Recieved a new message!");
      this.recievedMessage(msg);
    });
    socket.emit("chat message", {
      username: "tester1",
      ts: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      messageContent: "Good as well!",
    });
    this.setState({ socket });

    fetch("http://localhost:3001/messages", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((res) => {
        var messages = JSON.parse(res);

        this.setState({ messages: messages.reverse() });
        // console.log(messages);
      });
  }

  render() {
    const { classes } = this.props;
    const { messages, username } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h5" className={classes.headerMessage}>
              Chatty Dorothy's
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <MessageList
            messages={messages}
            classes={classes}
            sender={username}
          />
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                onChange={this.handleInputChange}
                id="message-input"
                value={this.state.messageInput}
                label="Send Message"
                fullWidth={true}
                multiline={true}
              />
            </Grid>
            <Grid xs={1} align="right">
              <IconButton onClick={() => this.handleSubmitMessage()}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(classes)(Chat);

function MessageList({ sender, messages, classes }) {
  if (messages.length == 0) {
    return (
      <List className={classes.messageArea}>
        <ListItem key={0}>
          <Grid container>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <ListItemText
                  align={"right"}
                  secondary={"No Messages Yet"}
                ></ListItemText>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }
  return (
    <List className={classes.messageArea}>
      {messages.map((message, index) => {
        const { username, timestamp, messageContent } = message;
        return (
          <ListItem key={index}>
            <Grid container>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <ListItemText
                    align={sender == username ? "right" : "left"}
                    secondary={username}
                  ></ListItemText>
                </Grid>
                <ListItemText
                  className={classes.bubble}
                  align={sender == username ? "right" : "left"}
                  primary={messageContent}
                ></ListItemText>
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align={sender == username ? "right" : "left"}
                  secondary={timestamp}
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
}
