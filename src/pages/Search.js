import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      artistSearch: '',
      isBtnDisabled: true,
      musicList: [],
      isLoading: false,
    };
  }

  fetchSearchAlbumsAPI = async () => {
    const { searchInput } = this.state;
    this.setState({
      isLoading: true,
    });
    const response = await searchAlbumsAPI(searchInput);
    if (response.length > 0) {
      this.setState((prevState) => ({
        searchInput: '',
        musicList: response,
        isLoading: false,
        artistSearch: prevState.searchInput,
      }));
    } else {
      this.setState((prevState) => ({
        searchInput: '',
        musicList: ['Nada localizado'],
        isLoading: false,
        artistSearch: prevState.searchInput,
      }));
    }
  };

  hendleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { searchInput } = this.state;
    const searchInputSize = searchInput.length > 1;
    this.setState({
      isBtnDisabled: !searchInputSize,
    });
  };

  render() {
    const { searchInput, isBtnDisabled, isLoading, musicList, artistSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="searchInput">
              <input
                type="text"
                id="searchInput"
                data-testid="search-artist-input"
                name="searchInput"
                value={ searchInput }
                onChange={ this.hendleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isBtnDisabled }
              onClick={ this.fetchSearchAlbumsAPI }
            >
              Pesquisar

            </button>
          </form>
        )}
        <div>
          <h2>
            {`Resultado de álbuns de: ${artistSearch}`}
          </h2>
          {musicList.length === 1 ? <p>Nenhum álbum foi encontrado</p>
            : (musicList.map((item) => (
              <Link
                key={ item.collectionId }
                to={ `/album/${item.collectionId}` }
                data-testid={ `link-to-album-${item.collectionId}` }
              >
                <div>
                  <h2>{item.collectionName}</h2>
                  <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                  <p>{item.artistName}</p>
                </div>
              </Link>
            )))}
        </div>
      </div>
    );
  }
}

export default Search;
