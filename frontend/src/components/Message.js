import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Message = ({ username, body, timestamp, postCount }) => (
  <div className="message">
    <div className="header">
      <p id='username'>{ username }</p>
      <p>{ new Date(timestamp).toDateString() }</p>
      <p id='postNumber'>No. { postCount }</p>
    </div>
    <p id='messageBody'>{ body }</p>
  </div>
)

Message.propTypes = {
  username: PropTypes.string,
  body: PropTypes.string,
  timestamp: PropTypes.number,
  postCount: PropTypes.number,
}

export default Message;
