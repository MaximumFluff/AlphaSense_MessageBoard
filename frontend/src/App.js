import React, { Component } from 'react';
import Messages from './components/Messages';
import Form from './components/Form';
import Header from './components/Header';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBoard: null,
      boardNames: null,
      loadedMessages: null,
      username: "",
      body: "",
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/channels')
      .then(response => response.json())
      .then(data => this.setState({ boardNames: data }))
    .catch(err => console.error(err))
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.selectedBoard) {
      fetch(`http://localhost:8000/messages/${this.state.selectedBoard}`)
        .then(response => response.json())
        .then(data => this.setState({ loadedMessages: data}))
      .catch(err => console.error(err))
    }
  }

  onBoardSelected = (value) => {
    this.setState({
      selectedBoard: value,
    })
  }

  updateField = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postNewMessage = () => {
    const { username, body } = this.state;
    console.log(username, body);
    if (this.state.selectedBoard === null) {
      console.warn("Cannot post message if no board is selected")
    }
    fetch(`http://localhost:8000/${this.state.selectedBoard}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, body: body }),
    })
      .then(response => response.json)
      .then(() => console.log("Message posted to backend"))
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className='App'>
        {this.state.boardNames ? <Header onBoardSelected={this.onBoardSelected} boards={this.state.boardNames}/> : null}
        <div className='content'>
          <Messages data={this.state.loadedMessages} boardName={this.state.selectedBoard}/>
          <Form updateField={this.updateField} postNewMessage={this.postNewMessage} username={this.state.username} body={this.state.body}/>
        </div>
      </div>
    );
  }
}
