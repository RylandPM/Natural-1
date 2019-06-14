import React, { Component } from "react";
import { Link } from "react-router-dom";
import { selectCharacter } from "../../dux/charReducer";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = reduxState => {
  const { user, game, character } = reduxState;
  return {
    username: user.username,
    gamename: game.game_name,
    character: character
  };
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
  }
  componentDidMount() {
    // this.props.requestUserData();
  }

  getGame(game) {
    axios.get(`/api/game/${game}`).then(res => {
      this.setState = {
        gamename: res.data.game_name
      };
    });
  }

  getCharacters() {
    axios.get("api/characters").then(res => {
      this.setState = {
        characters: res.data
      };
    });
  }

  changeHandler(state, inp) {
    this.setState = {
      [state]: inp
    };
  }

  render() {
    console.log(this.props);
    const { character, gamename, username } = this.props;
    return (
      <div className="Header">
        <h1>Critical Fail</h1>
        {/* game select and name display */}
        {gamename ? (
          <h2>Current Game: {gamename}</h2>
        ) : (
          <div className="game-select">
            <input onChange={e => this.changeHandler("game", e.target.value)} />
            <button onClick={this.getGame}>Join a Game</button>
          </div>
        )}
        {/* username display and character select */}
        {username ? (
          <div>
            <h2>User: {username}</h2>
            {/* character selector and stat display */}
            {character.charname ? (
              <div>
                <h2>Character: {character.charname}</h2>
                <h3>
                  class: {character.classes} lvl: {character.lvl}
                </h3>
                <div className="stats">
                  <ul>
                    <li>str: {character.strength}</li>
                    <li>dex: {character.dexterity}</li>
                    <li>con: {character.constitution}</li>
                    <li>wis: {character.wisdom}</li>
                    <li>int: {character.intelligence}</li>
                    <li>char: {character.charisma}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="character-select">
                <h2>No character selected</h2>
                <button>Select Character</button>
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
    );
  }
}

// export default invokedConnect(mapStateToProps)(Header);
export default connect(
  mapStateToProps,
  null
)(Header);
