import React from "react";
import "./Sqaures.css";
import axios from "axios";
import { useDrop } from "react-dnd";
import ItemTypes from "../ItemTypes";
import io from "socket.io-client";
import { connect } from "react-redux";
const socket = io();

const mapStateToProps = reduxState => {
  const { pegs } = reduxState;
  return {
    pegs: pegs.pegs
  };
};

const movePeg = (peg_name, xpos, ypos, game_name) => {
  axios
    .put("/api/peg", {
      peg_name: peg_name,
      xpos: xpos,
      ypos: ypos,
      game_name: game_name
    })
    .then(() => socket.emit("board", "garbage"));
};

function Square({ x, y, children, monster, game_name }) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PEG,
    drop: ({ name }) => movePeg(name, x, y, game_name),
    collect: monitor => ({
      peg_name: monitor.getDropResult(),
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div className="squares">{children}</div>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        />
      )}
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(Square);
