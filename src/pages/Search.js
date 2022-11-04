import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isBtnDisabled: true,
    };
  }

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
    const { searchInput, isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
