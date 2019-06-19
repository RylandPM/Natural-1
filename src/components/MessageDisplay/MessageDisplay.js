import React, { Component } from "react";
import { setMessages } from "../../dux/messageReducer";
import io from "socket.io-client";
import axios from "axios";
import { connect } from "react-redux";
import "./MessageDisplay.css";
const socket = io("http://localhost:4000");

const mapStateToProps = reduxState => {
  const { user, messages, game } = reduxState;
  return {
    user: user,
    game: game.game_name,
    messages: messages
  };
};

const mapDispatchToProps = {
  setMessages
};

class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newmessage: ""
    };
    socket.on("message", message => {
      this.props.setMessages(this.props.game);
    });
  }

  changeHandler(inp) {
    this.setState({
      newmessage: inp
    });
  }

  sendMessage() {
    axios
      .post(`/api/messages`, {
        newmessage: this.state.newmessage,
        game_name: this.props.game,
        user_id: this.props.user.user_id
      })
      .then(() => socket.emit("update", "nonsense"));
  }

  render() {
    const { newmessage } = this.state;
    const { messages } = this.props.messages;
    let mappedMessages = messages.map(element => {
      return (
        <li key={element.message_id}>
          <span>
            {" "}
            {element.username}: {element.message}{" "}
          </span>
        </li>
      );
    });
    return (
      <div className="message-display">
        <ul>{mappedMessages}</ul>
        <span>New Message: </span>
        <input
          onChange={e => this.changeHandler(e.target.value)}
          value={newmessage}
        />
        <button onClick={() => this.sendMessage(this.state)}>
          Send Message
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDisplay);
