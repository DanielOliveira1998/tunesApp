import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchGetUserAPI();
  }

  fetchGetUserAPI = async () => {
    const userName = await getUser();
    this.setState({
      userName,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <div>
              <h2 data-testid="header-user-name">{userName.name}</h2>
              <Link exact to="/search" data-testid="link-to-search">Search</Link>
              <Link exact to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link exact to="/profile" data-testid="link-to-profile">Profile</Link>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
