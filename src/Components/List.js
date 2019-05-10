import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './List.css';

class List extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
  };

  state = {
    filterText: '',
  };

  onChangeFilterText = e => {
    this.setState({
      filterText: e.target.value,
    });
  };

  deleteUser() {
    fetch('http://localhost:3042/api/personnel/delete', {
      method: 'DELETE',
    }).then(data => this.setState({ getData: data }));
  }

  render() {
    const filteredContacts =
      this.props &&
      this.props.contacts &&
      this.props.contacts.length &&
      this.props.contacts.filter(contact => {
        return contact.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1;
      });

    return (
      <div className={'listArea'}>
        <input
          value={this.state.filterText}
          onChange={this.onChangeFilterText}
          name={'filter'}
          id={'filter'}
          placeholder={'filter by name or phone'}
        />

        <ul className={'list'}>
          {filteredContacts &&
            filteredContacts.length &&
            filteredContacts.map(contact => (
              <li key={contact.id}>
                <span className={'name'}>{contact.name}</span>
                <span className={'mail'}>{contact.mail}</span>
                <span className={'clearfix'} />
                <button style={{ color: 'red' }} onClick={() => this.deleteUser(contact.id)}>
                  Sil
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default List;
