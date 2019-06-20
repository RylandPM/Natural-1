import React, { Component } from "react";
import { Link } from "react-router-dom";
import { requestUserData } from "../../dux/userReducer";
import { selectGame } from "../../dux/gameReducer";
import { setMessages } from "../../dux/messageReducer";
import { setPegs } from "../../dux/pegReducer";
import axios from "axios";
import { connect } from "react-redux";
import "./Header.css";

const mapStateToProps = reduxState => {
  const { user, game, character } = reduxState;
  return {
    user: user,
    username: user.username,
    gamename: game.game_name,
    character: character
  };
};

const mapDispatchToProps = {
  requestUserData,
  selectGame,
  setMessages,
  setPegs
};

const invokedConnect = connect();
console.log(invokedConnect);

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      gamename: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.getGame = this.getGame.bind(this);
    this.makeGame = this.makeGame.bind(this);
  }
  componentDidMount() {
    requestUserData();
  }

  joinGame() {
    // console.log(this.props.user);
    axios
      .post(`/api/game/${this.state.gamename}`, this.props.user)
      .then(res => {
        this.props.selectGame(res.data[0].game_name);
      });
  }

  getGame() {
    this.props
      .selectGame(this.state.gamename, this.props.user.user_id)
      .then(
        this.props.setMessages(this.state.gamename),
        this.props.setPegs(this.state.gamename)
      );
  }

  makeGame() {
    axios.post(`/api/game`, this.props);
  }

  getCharacters() {
    axios.get("api/characters").then(res => {
      this.setState = {
        characters: res.data
      };
    });
  }

  changeHandler(state, inp) {
    this.setState({
      [state]: inp
    });
  }

  render() {
    // console.log(this.props);
    const { character, gamename, username } = this.props;
    return (
      <div>
        <div className="header">
          <div className="Title_and_games">
            <h1>Critical Fail</h1>
            {/* game select and name display */}
            {gamename ? (
              <h2>Current Game: {gamename}</h2>
            ) : (
              <div className="game-select">
                <input
                  onChange={e => this.changeHandler("gamename", e.target.value)}
                />
                <button onClick={this.joinGame}>Join a Game</button>
                <button onClick={this.getGame}>Connect to Joined Game</button>
                <button onClick={this.makeGame}>Create a Game</button>
              </div>
            )}
          </div>
          {/* username display and character select */}
          <div className={this.props.user.classname}>
            {username ? (
              <div>
                <h2>User: {username}</h2>
                {/* character selector and stat display */}
                {character.char_name ? (
                  <div>
                    <div>
                      <h2>Character: {character.char_name}</h2>
                      <h3>
                        class: {character.classes} lvl: {character.lvl}
                      </h3>
                    </div>
                    <div className="stats">
                      <ul>
                        <li>str: {character.strength} </li>
                        <li>dex: {character.dexterity} </li>
                        <li>con: {character.constitution} </li>
                        <li>wis: {character.wisdom} </li>
                        <li>int: {character.intelligence} </li>
                        <li>char: {character.charisma} </li>
                      </ul>
                      <Link to="/charactergen">
                        <button>Select Character</button>
                      </Link>
                      <Link to="/dash">
                        <button>Lobby</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="character-select">
                    <h2>No character selected</h2>
                    <Link to="/charactergen">
                      <button>Select Character</button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link to="/">
                  <button>Login page</button>
                </Link>
                <Link to="/register">
                  <button>Registration page</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// export default invokedConnect(mapStateToProps)(Header);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
