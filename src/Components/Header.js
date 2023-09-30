import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../Pages/Loading";
import { getUser } from "../services/userAPI";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loadingScreen: false,
      userName: "",
    };
  }

  componentDidMount() {
    this.waitAPI();
  }

  waitAPI = async () => {
    this.setState({ loadingScreen: true });
    const userName = await getUser();
    this.setState({ loadingScreen: false });
    this.setState({ userName: userName.name });
  };

  render() {
    const { loadingScreen, userName } = this.state;
    if (loadingScreen) return <Loading />;
    return (
      <header className="" data-testid="header-component">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="/search"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl text-white">EUPHOREARS</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-green-700" to="/search">
              Buscar{" "}
            </Link>
            <Link className="mr-5 hover:text-green-700" to="/favorites">
              Favoritas
            </Link>
            <Link className="mr-5 hover:text-green-700" to="/profile">
              Perfil{" "}
            </Link>
          </nav>

          <div className="avatar success">
            <div>{ userName }</div>
          </div>
        <div class="divider success" />
        </div>
      </header>
    );
  }
}

export default Header;
