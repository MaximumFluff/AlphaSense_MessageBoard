import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Message = ({ username, body }) => (
  <div className="message">
    <p>Username: { username }</p>
    <p>Body: { body }</p>
  </div>
)

Message.propTypes = {
  username: PropTypes.string,
  body: PropTypes.string,
}

export default Message;
