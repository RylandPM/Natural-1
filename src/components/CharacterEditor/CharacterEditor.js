import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { selectCharacter } from "../../dux/charReducer";
import axios from "axios";
import { connect } from "react-redux";

class CharacterEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char_name: "",
      classes: "",
      lvl: 0,
      health: 0,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      characters: [],
      post: true,
      redirect: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
  }
  componentDidMount() {
    this.getCharacters();
  }

  changeHandler(state, inp) {
    this.setState({
      [state]: inp
    });
  }

  getCharacters() {
    axios
      .get(`/api/characters?user_id=${this.props.user.user_id}`)
      .then(response => {
        this.setState({
          characters: response.data
        });
      });
  }

  postCharacter() {
    for (let i = 0; i < this.state.characters.length; i++) {
      if (this.state.char_name === this.state.characters[i].char_name) {
        const id = this.state.characters[i].character_id;
        console.log(id);
        axios.put(`/api/characters/${id}`, this.state).then(() => {
          this.getCharacters();
          this.setState({
            post: false
          });
        });
      }
    }
    if (this.state.post === true) {
      axios.post(`/api/characters`, this.state).then(this.getCharacters());
    } else if (this.state.post === false) {
      this.setState({
        post: true
      });
    }
  }

  deleteCharacter(id) {
    axios
      .delete(`/api/characters/${id}`, this.props.user.user_id)
      .then(this.getCharacters());
  }

  render() {
    const { characters } = this.state;
    let mappedCharacters = characters.map(element => {
      return (
        <li key={element.character_id}>
          <span>
            Name: {element.char_name} Level: {element.lvl} Classes:{" "}
            {element.classes}{" "}
          </span>
          <button
            onClick={() =>
              this.props.selectCharacter(element.character_id).then(() => {
                this.setState({
                  redirect: true
                });
              })
            }
          >
            Select
          </button>
          <button onClick={() => this.deleteCharacter(element.character_id)}>
            Delete
          </button>
        </li>
      );
    });
    return (
      <div className="CharacterEditor">
        <div>
          <div className="Character_Select">
            <span>
              To update characters use same character name and input new stats
            </span>
            <ul>{mappedCharacters}</ul>
          </div>
          <div className="Character_Editor">
            <div className="charname">
              <h2>Character Name: </h2>
              <input
                onChange={e => this.changeHandler("char_name", e.target.value)}
              />
            </div>
            <div className="classes">
              <h2>Classes: </h2>
              <input
                onChange={e => this.changeHandler("classes", e.target.value)}
              />
            </div>
            <div className="level">
              <h2>level: </h2>
              <input
                onChange={e => this.changeHandler("lvl", e.target.value)}
              />
            </div>
            <div className="health">
              <h2>Health: </h2>
              <input
                onChange={e => this.changeHandler("health", e.target.value)}
              />
            </div>
            <div className="strength">
              <h2>Strength: </h2>
              <input
                onChange={e => this.changeHandler("strength", e.target.value)}
              />
            </div>
            <div className="dexterity">
              <h2>Dexterity: </h2>
              <input
                onChange={e => this.changeHandler("dexterity", e.target.value)}
              />
            </div>
            <div className="constitution">
              <h2>Constitution: </h2>
              <input
                onChange={e =>
                  this.changeHandler("constitution", e.target.value)
                }
              />
            </div>
            <div className="intelligence">
              <h2>Intelligence: </h2>
              <input
                onChange={e =>
                  this.changeHandler("intelligence", e.target.value)
                }
              />
            </div>
            <div className="wisdom">
              <h2>Wisdom: </h2>
              <input
                onChange={e => this.changeHandler("wisdom", e.target.value)}
              />
            </div>
            <div className="charisma">
              <h2>Charisma: </h2>
              <input
                onChange={e => this.changeHandler("charisma", e.target.value)}
              />
            </div>
            <button onClick={() => this.postCharacter()}>Set Character</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  selectCharacter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterEditor);
