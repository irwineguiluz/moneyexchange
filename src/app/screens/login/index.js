import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import appConstants from '../../constants/app';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    axios.post(`${appConstants.API_URL}/login`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      .then(res => {
        sessionStorage.setItem('token', res.data.token);
        localStorage.setItem('token', res.data.token);
      })
      .catch(error => {
          console.log(error.response)
      });
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
    } = this.state;

    const isAlreadyAuthenticated = this.isAuthenticated();

    return (
      <div>
      { isAlreadyAuthenticated ? <Redirect to={{
        pathname: '/home'
      }} /> : (
        <form onSubmit={this.onFormSubmit}>
          <input
              type="text"
              onChange={this.handleInputChange}
              value={email}
              name="email"
          />
          <input
              type="text"
              onChange={this.handleInputChange}
              value={password}
              name="password"
          />
          <input type="submit" value="Login" />
        </form>
      )}
      </div>
    );
  }
}

export default Login;