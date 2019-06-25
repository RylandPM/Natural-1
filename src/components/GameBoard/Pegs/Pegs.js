import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../ItemTypes";
import "./Pegs.css";

function Peg({ peg_name }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PEG, name: peg_name },
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
        {peg_name}
      </div>
    </div>
  );
}

export default Peg;
