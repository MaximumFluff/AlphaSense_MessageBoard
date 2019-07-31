import React, { Component } from 'react';
import Messages from './components/Messages';
import Form from './components/Form';
import Header from './components/Header';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBoardName: null,
      boardNames: null,
      loadedMessages: null,
      username: '',
      body: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8000/channels');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      await this.setState({
        boardNames: json,
      })
    }
    catch(err) {
      console.error(err);
    }
  }

  onBoardSelected = async (name, symbol) => {
    if (name) {
      await this.setState({
        selectedBoardName: name,
        selectedBoardSymbol: symbol,
      })
      await this.getNewMessages();
    }
  };

  getNewMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/messages/${this.state.selectedBoardSymbol}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      console.log(json);
      await this.setState({
        loadedMessages: json,
      })
    }
    catch(err) {
      console.error(err);
    }
  };

  updateField = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  postNewMessage = async () => {
    const { username, body } = this.state;
    console.log(username, body);
    if (this.state.selectedBoard === null) {
      alert('Cannot post message if no board is selected');
    } else {
      try {
        const response = await fetch(`http://localhost:8000/${this.state.selectedBoardSymbol}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, body }),
        })
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const json = await response.json();
        console.log(json);
        console.log("Message posted to backend");
        await this.getNewMessages();
      }
      catch(err) {
        console.error(err);
      }
    }
  };

  render() {
    return (
      <div className='App'>
        {this.state.boardNames ? (
          <Header
            onBoardSelected={this.onBoardSelected}
            boards={this.state.boardNames}
          />
        ) : null}
        <h1 id='header'>
          {this.state.selectedBoardName
            ? this.state.selectedBoardName
            : 'No board selected'}
        </h1>
        <div className='content'>
          <Messages
            data={this.state.loadedMessages}
          />
          <Form
            updateField={this.updateField}
            postNewMessage={this.postNewMessage}
            username={this.state.username}
            body={this.state.body}
          />
        </div>
      </div>
    );
  }
}
