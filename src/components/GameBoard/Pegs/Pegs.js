import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../ItemTypes";
import io from "socket.io-client";
import "./Pegs.css";
const socket = io("http://localhost:4000");

function Peg() {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PEG },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div className="wrapper">
      <div
        className="peg"
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move"
        }}
      >
        ♘
      </div>
    </div>
  );
}

export default Peg;
