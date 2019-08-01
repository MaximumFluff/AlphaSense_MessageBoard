import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import '../App.css';

const Messages = ({ data }) => (
  <div className="messages">
    {data ? data.map(message => (
      <Message username={message.username} body={message.body} postCount={message.post_number} timestamp={message.timestamp} replies={message.replies}/>
    )) : <p>No messages to display</p>}
    {(data !== null && data.length === 0) ? <p>No messages to display</p> : null}
  </div>
)

export default Messages;

Messages.propTypes = {
  data: PropTypes.array,
}