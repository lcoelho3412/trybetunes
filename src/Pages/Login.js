import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { createUser } from "../services/userAPI";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: "",
      isButtonDisabled: true,
      loadingScreen: false,
      loaded: false,
    };
  }

  saveUser = (event) => {
    const minCharacters = 3;
    if (event.target.value.length >= minCharacters) {
      this.setState({
        isButtonDisabled: false,
        userName: event.target.value,
      });
    }
  };

  login = async (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ loadingScreen: true });
    await createUser({ name: userName });
    this.setState({ loadingScreen: false, loaded: true });
  };

  render() {
    const { isButtonDisabled, loadingScreen, loaded } = this.state;
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <form className="mx-auto">
            <p className="py-4">Login</p>
            <input
              className="input outline success"
              type="text"
              name="input-name"
              data-testid="login-name-input"
              placeholder="Digite seu Login"
              onChange={this.saveUser}
            />
            <div className="py-4">
              <button
                className="btn outline bw"
                name="login-btn"
                type="submit"
                data-testid="login-submit-button"
                disabled={isButtonDisabled}
                onClick={this.login}
              >
                Entrar
              </button>
              <div className="py-4 flex gap-4">
                <input className="switch bordered success" type="checkbox" />
                <p className="text-sm ">Lembrar de mim</p>
              </div>
            </div>
            <div className=" ">
              {loadingScreen && <Loading />}
              {loaded && <Navigate to="/search" />}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
