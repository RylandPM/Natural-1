import React, { Component } from "react";
import Square from "./Squares/Squares";
import Peg from "./Pegs/Pegs";
import io from "socket.io-client";
import axios from "axios";
import { connect } from "react-redux";
import { setPegs } from "../../dux/pegReducer";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./GameBoard.css";
const socket = io("http://localhost:4000");

const mapStateToProps = reduxState => {
  const { pegs, game, user } = reduxState;
  return {
    user: user,
    game: game.game_name,
    pegs: pegs.pegs
  };
};

const mapDispatchToProps = {
  setPegs
};

function renderSquare(i, [pieceX, pieceY], name, monster) {
  const x = i % 10;
  const y = Math.floor(i / 10);
  const isPieceHere = pieceX === x && pieceY === y;
  const piece = isPieceHere ? <Peg /> : null;

  return (
    <div key={i} style={{ width: "10%", height: "10%" }}>
      <Square pegname={name} ismonster={monster} x={x} y={y}>
        {piece}
      </Square>
    </div>
  );
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ""
    };
    socket.on("rebuild", change => {
      this.props.setPegs(this.props.game);
    });
  }

  render() {
    let squares = [];
    console.log(this.props);
    if (this.props.pegs[0]) {
      console.log("this shouldnt happen");
      const { xpos, ypos, peg_name, monster } = this.props.pegs[0];
      for (let i = 0; i < 100; i++) {
        squares.push(renderSquare(i, [xpos, ypos], peg_name, monster));
      }
    } else {
      for (let i = 0; i < 100; i++) {
        squares.push(renderSquare(i, [4, 4]));
      }
    }
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="gameboard">{squares}</div>
      </DragDropContextProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);
