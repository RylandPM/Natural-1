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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      gamename: ""
    };
  }
  componentDidMount() {
    this.props.requestUserData;
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
    return (
      <div className="Header">
        <h1>Natural 1</h1>
        {gamename ? (
          <h2>Current Game: {gamename}</h2>
        ) : (
          <div className="game-select">
            <input onChange={this.changeHandler("game", e.target.value)} />
            <button onClick={this.getGame}>Join a Game</button>
          </div>
        )}
        {username ? (
          <h2>User: {username}</h2>
        ) : (
          <div>
            {character ? (
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
            <div>
              <Link>
                <button>login</button>
              </Link>
              <Link>
                <button>register</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default invokedConnect(mapStateToProps)(Header);
