import React, { Component } from "react";

import Header from "../Components/Header";
import Loading from "./Loading";

import searchAlbumsAPI from "../services/searchAlbumsAPI";

import SearchResult from "../Components/Searchresult";
import billboard from "../services/Billboard";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: "",
      isButtonDisabled: true,
      loadingScreen: false,
      searchResults: [],
      notFound: false,
      name: "",
    };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    await this.setState({ // Make sure to await the state update
      searchInput: 'bts',
      isButtonDisabled: false, // Enable the button initially
    });
    this.fetchAlbumAPI();
  }
  

  searchResults = (event) => {
    const minCharacters = 2;
    if (event.target.value.length >= minCharacters) {
      this.setState({
        isButtonDisabled: false,
        searchInput: event.target.value,
      });
    }
  };


  fetchAlbumAPI = async () => {
    const { searchInput } = this.state;
    this.setState({ loadingScreen: true });
    const holdResultFromSearch = await searchAlbumsAPI(searchInput);
    console.log("file: Search.js:50 ~ Search ~ fetchAlbumAPI= ~ holdResultFromSearch:", holdResultFromSearch)
    if (holdResultFromSearch.length === 0) {
      this.setState({
        notFound: true,
      });
    }
    this.setState({
      loadingScreen: false,
      searchResults: holdResultFromSearch,
      searchInput: "",
      name: searchInput,
    });
  };

  render() {
    const { isButtonDisabled, searchResults, loadingScreen, name, notFound } =
      this.state;

    return (
      <main className="dark text-foreground bg-background">
        <Header />

        <div data-testid="page-search">
          {loadingScreen ? (
            <Loading />
          ) : (
            <div className="flex items-center justify-center gap-4">
              <input
                className="input outline success flex rounded-md shadow-sm w-1/2"
                type="text"
                name="search-artist-input"
                data-testid="search-artist-input"
                placeholder="O que você quer ouvir?"
                onChange={this.searchResults}
              />
              <button
                className="btn light success"
                name="search-artist-button"
                type="submit"
                data-testid="search-artist-button"
                disabled={isButtonDisabled}
                onClick={this.fetchAlbumAPI}
              >
                Buscar
              </button>
            </div>
          )}
        </div>

        {notFound && <p>Nenhum álbum foi encontrado</p>}

        <SearchResult
          loadingScreen={loadingScreen}
          searchResults={searchResults}
          name={name}
        />
      </main>
    );
  }
}

export default Search;
