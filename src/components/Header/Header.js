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
    game: game,
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
    this.createPeg = this.createPeg.bind(this);
  }
  componentDidMount() {
    requestUserData();
  }

  joinGame() {
    // console.log(this.props.user);
    axios
      .post(`/api/game/${this.state.gamename}`, this.props.user)
      .then(res => {
        this.props
          .selectGame(res.data[0].game_name)
          .then(this.props.setPegs(this.state.gamename));
      });
  }

  getGame() {
    this.props
      .selectGame(this.state.gamename, this.props.user.user_id)
      .then(
        this.props
          .setMessages(this.state.gamename)
          .then(this.props.setPegs(this.state.gamename))
      );
  }

  makeGame() {
    axios
      .post(`/api/game`, {
        gamename: this.state.gamename,
        gm: this.props.user.user_id
      })
      .then(
        this.props
          .setMessages(this.state.gamename)
          .then(this.props.setPegs(this.state.gamename))
      );
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

  createPeg() {
    console.log(this.props.game);
    axios
      .post("/api/peg", {
        peg_name: this.props.character.char_name,
        xpos: 0,
        ypos: 0,
        monster: false,
        game_id: this.props.game.game_id,
        game_name: this.props.gamename
      })
      .then(this.props.setPegs(this.state.gamename));
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
              <div className="game-display">
                <h2>Current Game: {gamename}</h2>
                {character.char_name ? (
                  <button onClick={this.createPeg}>Make Character Peg</button>
                ) : null}
              </div>
            ) : (
              <div className="game-select">
                <div>
                  <input
                    onChange={e =>
                      this.changeHandler("gamename", e.target.value)
                    }
                  />
                </div>
                <div>
                  <button onClick={this.joinGame}>Join a Game</button>
                  <button onClick={this.getGame}>Connect to Game</button>
                  <button onClick={this.makeGame}>Create a Game</button>
                </div>
              </div>
            )}
          </div>
          {/* username display and character select */}
          <div className={this.props.user.classname}>
            {username ? (
              <div className="User">
                {/* character selector and stat display */}
                {character.char_name ? (
                  <div className="User-Display">
                    <div className="Player-details">
                      <h2>User: {username}</h2>
                      <Link to="/charactergen">
                        <div className="charselectbuttons">
                          <button>Characters</button>
                        </div>
                      </Link>
                      <Link to="/dash">
                        <div className="charselectbuttons">
                          <button>Lobby</button>
                        </div>
                      </Link>
                    </div>
                    <div className="stats">
                      <div className="char-dets">
                        <h2>Character: {character.char_name}</h2>
                        <h3>
                          class: {character.classes} lvl: {character.lvl}
                        </h3>
                      </div>
                      <div className="stat-nums">
                        <ul className="statlist">
                          <li>str: {character.strength} </li>
                          <li>dex: {character.dexterity} </li>
                          <li>con: {character.constitution} </li>
                        </ul>
                        <ul className="statlist">
                          <li>wis: {character.wisdom} </li>
                          <li>int: {character.intelligence} </li>
                          <li>char: {character.charisma} </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="character-select">
                    <h2>User: {username}</h2>
                    <h3>Select character and join</h3>
                    <h3>game to place new pieces</h3>
                    <Link to="/charactergen">
                      <div className="charselectbuttons">
                        <button>Select Character</button>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link to="/">
                  <div className="loginbuttons">
                    <button>Login page</button>
                  </div>
                </Link>
                <Link to="/register">
                  <div className="loginbuttons">
                    <button>Registration page</button>
                  </div>
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
