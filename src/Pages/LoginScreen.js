import React, { Component } from 'react';

import './LoginScreen.css';
import { userService } from '../services/user.service';

class LoginScreen extends Component {
  state = {
    name: 'anilyildirim12@gmail.com',
    password: 'Test123*',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async e => {
    e.preventDefault();
    const { name, password } = this.state;
    const res = await userService.login(name, password);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    this.props.history.push('/');
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <label htmlFor="fname">Kullanıcı Adı</label>
        <input
          onChange={this.handleChange}
          value={this.state.name}
          name={'name'}
          type="text"
          id="fname"
          placeholder="Kullanıcı adı Giriniz"
        />
        <label htmlFor="lname">Şifre</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          name={'password'}
          type="text"
          id="lname"
          placeholder="Şifre Giriniz"
        />
        <input type="submit" value="LOG IN" />
      </form>
    );
  }
}

export default LoginScreen;
