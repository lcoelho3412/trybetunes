import React, { Component } from "react";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import Loading from "../Pages/Loading";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
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
      <>
        <div className="flex items-center justify-center">
          <label for="hs-trailing-button-add-on-with-icon" class="sr-only">
            Label
          </label>
          <div className="flex rounded-md shadow-sm w-1/2 ">
            <input
              placeholder="O que você quer ouvir?"
              type="text"
              id="hs-trailing-button-add-on-with-icon"
              name="hs-trailing-button-add-on-with-icon"
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-green-500 focus:ring-green-500 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-300"
              onChange={this.searchResults}
            />
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] rounded-r-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
              onClick={this.fetchAlbumAPI}
            >
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            {notFound && <p>Nenhum álbum foi encontrado</p>}
        {loadingScreen ? (
          <Loading />
        ) : (
          <div>
            <p>
              {`Resultado de álbuns de: 
                  ${name}`}
            </p>
            {searchResults.map((artist, index) => (
              <div key={index}>
                <p>{artist.colectionName}</p>
                <Link
                  to={`/album/${artist.collectionId}`}
                  data-testid={`link-to-album-${artist.collectionId}`}
                >
                  {artist.collectionName}
                </Link>
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
      </>
    );
  }
}
