import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { Login, Register } from "./components/Login/Login";
import GameMaker from "./components/GameMaker/GameMaker";
import MonsterMaker from "./components/MonsterMaker/MonsterMaker";
import CharacterEditor from "./components/CharacterEditor/CharacterEditor";
import "./reset.css";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Dashboard} exact path="/dash" />
          <Route component={Register} exact path="/register" />
          <Route component={GameMaker} exact path="/gamegen" />
          <Route component={MonsterMaker} exact path="/monstergen" />
          <Route component={CharacterEditor} exact path="/charactergen" />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
