import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Message = ({ username, body, timestamp, postCount, replies }) => (
  <div className='message'>
    <div className='header'>
      <p id='username'>{username}</p>
      <p>{new Date(timestamp).toDateString()}</p>
      <p id='postNumber'>No. {postCount}</p>
    </div>
    <p id='messageBody'>{body}</p>
    {replies.length !== 0 ? (
      <div className='replies'>
        {replies.map(reply => (
          <div className='reply'>
            <div className='reply-header'>
              <p id='username'>{reply.username}</p>
              <p>{new Date(reply.timestamp).toDateString()}</p>
              <p id='postNumber'>No. {reply.post_number}</p>
            </div>
            <p id='messageBody'>{reply.body}</p>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

Message.propTypes = {
  username: PropTypes.string,
  body: PropTypes.string,
  timestamp: PropTypes.number,
  postCount: PropTypes.number,
  replies: PropTypes.array,
};

export default Message;
