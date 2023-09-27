import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { createUser } from "../services/userAPI";

import { Input, Switch } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

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
            <p>Login</p>
            <Input
              className="py-4"
              type="text"
              name="input-name"
              data-testid="login-name-input"
              placeholder="Digite seu Login"
              onChange={this.saveUser}
            />
            <Button
              color="primary"
              className=""
              name="login-btn"
              type="submit"
              data-testid="login-submit-button"
              disabled={isButtonDisabled}
              onClick={this.login}
            >
              Entrar
            </Button>
            <div className="py-4">
              <Switch size="sm" defaultSelected>
                Lembrar de mim
              </Switch>
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
