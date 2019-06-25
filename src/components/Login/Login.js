import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { requestUserData } from "../../dux/userReducer";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(state, inp) {
    this.setState({
      [state]: inp
    });
  }

  attemptLogin() {
    axios
      .post("/auth/login", this.state)
      .then(() => {
        console.log("got response");
        this.props.requestUserData();
        this.setState({
          redirect: true
        });
      })
      .catch(err => {
        console.log(err);
        alert("Incorrect Username/Password");
      });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/dash" />;
    }
    return (
      <div className="login">
        <div>
          <h2>Login</h2>
          <div>
            <h3>Username: </h3>
            <input
              onChange={e => this.changeHandler("username", e.target.value)}
              value={this.state.username}
            />
          </div>
          <div>
            <h3>Password: </h3>
            <input
              onChange={e => this.changeHandler("password", e.target.value)}
              type="password"
              value={this.state.password}
            />
          </div>
          <button onClick={() => this.attemptLogin(this.state)}>Login</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log(reduxState);
  return reduxState;
};

const mapDispatchToProps = {
  requestUserData
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

// export default invokedConnect(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
