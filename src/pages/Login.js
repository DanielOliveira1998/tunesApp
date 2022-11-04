import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isBtnDisabled: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchCreateUserAPI();
  }

  fetchCreateUserAPI = async () => {
    const { userName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: userName });
    this.setState({
      isLoading: false,
    });
    if (userName) {
      this.pushHistory('/search');
    }
  };

  pushHistory = (pathName) => {
    const { history } = this.props;
    history.push(pathName);
  };

  hendleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  };

  validateForm = () => {
    const { userName } = this.state;
    const userNameSize = userName.length > 2;
    this.setState({
      isBtnDisabled: !userNameSize,
    });
  };

  render() {
    const { userName, isBtnDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="userName">
              Usuário:
              <input
                type="text"
                id="userName"
                data-testid="login-name-input"
                name="userName"
                value={ userName }
                onChange={ this.hendleChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isBtnDisabled }
              onClick={ this.fetchCreateUserAPI }
            >
              Entrar

            </button>
          </form>
        ) }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;
