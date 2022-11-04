import React, { Component } from 'react';
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
          : <h2 data-testid="header-user-name">{userName.name}</h2>}
      </header>
    );
  }
}

export default Header;
