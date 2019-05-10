import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: '',
    email: '',
    password: '123456',
    confirmPassword: '123456',
    code: 'f',
    type: '1',
    isEmployed: true,
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.onSaveUser();

    this.setState({
      name: '',
      email: '',
      type: '1',
      isEmployed: true,
    });
  }

  onSaveUser() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...this.state }),
    };

    return fetch(`http://localhost:3042/api/personnel/save`, requestOptions).then(async res => {
      if (res.status !== 200) {
        const error = await res.json();
        this.setState({ error: error.message });

        alert(this.state.error);
        return;
      }

      this.props.addContact({
        ...this.state,
      });
    });
  }

  isEmployedChanged = e => {
    this.setState({
      isEmployed: !this.state.isEmployed,
      type: !this.state.isEmployed ? '1' : '2',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input name="name" id="name" value={this.state.name} onChange={this.onChange} placeholder="Enter a name" />
          <br />
          <input
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Enter a email"
          />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="site"
                value={this.state.isEmployed}
                checked={this.state.isEmployed}
                onChange={this.isEmployedChanged}
              />
              İşçi
              <br />
            </div>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="address"
                value={!this.state.isEmployed}
                checked={!this.state.isEmployed}
                onChange={this.isEmployedChanged}
              />{' '}
              Tekniker
              <br />
            </div>
          </div>
          <button>Ekle</button>
        </form>
      </div>
    );
  }
}

export default Form;
