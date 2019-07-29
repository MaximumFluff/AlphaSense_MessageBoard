import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import '../App.css';

const Messages = ({ data, boardName }) => (
  <div className="messages">
    <h1>{boardName ? boardName : "No board selected"}</h1>
    {data ? data.map(message => (
      <Message username={message.username} body={message.body}/>
    )) : <p>No messages to display</p>}
    {(data !== null && data.length === 0) ? <p>No messages to display</p> : null}
  </div>
)

export default Messages;

Messages.propTypes = {
  data: PropTypes.array,
  boardName: PropTypes.string,
}