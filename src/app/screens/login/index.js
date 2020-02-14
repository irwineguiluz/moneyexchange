import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import appConstants from '../../constants/app';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;

    if (email != '' && password != '') {
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', password);

      axios.post(`${appConstants.API_URL}/login`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          }
        })
        .then(res => {
          sessionStorage.setItem('token', res.data.token);
          localStorage.setItem('token', res.data.token);
          window.location.reload(true);
        })
        .catch(error => {
          console.log('erraor', error.response.data.error)
          this.setState({
            errorMessage: error.response.data.error,
            email: '',
            password: '',
          });
        });
    } else {
      this.setState({
        errorMessage: 'You must enter email and password',
      });

    }
  }

  isAuthenticated = () => {
    const token = localStorage.getItem('token');

    return token && token.length > 10;
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render () {
    const {
      email,
      password,
      errorMessage,
    } = this.state;

    const isAlreadyAuthenticated = this.isAuthenticated();

    return (
      <div className="login-body">
      { isAlreadyAuthenticated ? <Redirect to={{
        pathname: '/home'
      }} /> : (
        <div className="login__container">
          <div className="login__wrapper">
            <form className="login-form__wrapper" onSubmit={this.onFormSubmit}>
              <div className="header__logo">money<span>X</span>change</div>
              {errorMessage && <h4 className="title">{errorMessage}</h4>}
              <div className="input">
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={email}
                    name="email"
                    className="input-item txt"
                    placeholder="Insert e-mail"
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  onChange={this.handleInputChange}
                  value={password}
                  name="password"
                  className="input-item txt"
                  placeholder="Insert password"
                />
              </div>
              <div className="input button">
                <input type="submit" value="Login" className="input-item btn" />
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default Login;