import React from "react";
import Gameboard from "../GameBoard/GameBoard";
import MessageDisplay from "../MessageDisplay/MessageDisplay";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* <Gameboard /> */}
      <MessageDisplay />
    </div>
  );
}

export default Dashboard;
