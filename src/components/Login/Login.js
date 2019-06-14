import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { requestUserData } from "../../dux/userReducer";
import axios from "axios";

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

  componentDidMount() {
    requestUserData();
  }

  changeHandler(state, inp) {
    this.setState = {
      [state]: inp
    };
  }

  attemptLogin() {
    axios
      .post("/auth/login", this.state)
      .then(() => {
        requestUserData();
        this.setState = {
          redirect: true
        };
      })
      .catch(err => {
        console.log(err);
        alert("Incorrect Username/Password");
      });
  }

  render() {
    console.log(this.props);
    if (this.state.redirect === true) {
      return <Redirect to="/dash" />;
    }
    return (
      <div className="login">
        <h1>Login</h1>
        <div>
          <h3>Username: </h3>
          <input
            onChange={e => this.changeHandler("username", e.target.value)}
          />
        </div>
        <div>
          <h3>Password: </h3>
          <input
            onChange={e => this.changeHandler("password", e.target.value)}
          />
        </div>
        <button onClick={() => this.attemptLogin(this.state)}>Login</button>
        <Link to="/register">
          <button>Register</button>
        </Link>
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
