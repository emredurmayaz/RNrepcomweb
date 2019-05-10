import React from 'react';
import Contacts from '../Components/Contacts';
import { Link } from 'react-router-dom';

class ContactScreen extends React.Component {
  state = {
    personnels: [],
    machines: [],
    contacts: [],
    faults: [],
    data: {},
  };

  async componentDidMount() {
    fetch('http://localhost:3042/api/personnel/get')
      .then(data => data.json())
      .then(personnel => this.setState({ personnels: personnel }));

    console.log('token' + localStorage.getItem('token'));

    fetch('http://localhost:3042/api/fault/getLastFaults')
      .then(data => data.json())
      .then(getLastFaults => this.setState({ faults: getLastFaults }));
  }

  addContact(contact) {
    console.log('geldi');
    fetch('http://localhost:3042/api/personnel/get')
      .then(data => data.json())
      .then(personnel => this.setState({ personnels: personnel }));
    // const { contacts } = this.state;
    // contacts.push(contact);
    // this.setState({
    //   contacts,
    // });
  }

  render() {
    console.log(this.state.faults);
    return (
      <div className="App">
        <header className={'header'}>
          <Link to="/login">Log out</Link>
          {/* <Link to="/">Contact</Link> */}
        </header>
        <Contacts addContact={contact => this.addContact(contact)} contacts={this.state.personnels} />

        <table style={{ width: '100%', border: '5px solid black' }}>
          <tbody>
            <tr>
              <th>Makine İsmi</th>
              <th>Arıza Tipi</th>
              <th>Arıza Tarihi</th>
              <th>Oncelik</th>
              <th>Personel İsmi</th>
            </tr>
            {this.state.faults &&
              this.state.faults.length &&
              this.state.faults.map((item, i) => (
                <tr key={i} style={{ textAlign: 'center' }}>
                  <td>{item.machine.name}</td>
                  <td>{item.faultType.name}</td>
                  <td>{item.date}</td>
                  <td>{item.priority}</td>
                  <td>{item.personnel.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactScreen;
