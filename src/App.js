import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register/Register";
import MonsterMaker from "./components/MonsterMaker/MonsterMaker";
import CharacterEditor from "./components/CharacterEditor/CharacterEditor";
import Dashboard from "./components/Dashboard/Dashboard";
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
          <Route component={MonsterMaker} exact path="/monstergen" />
          <Route component={CharacterEditor} exact path="/charactergen" />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
