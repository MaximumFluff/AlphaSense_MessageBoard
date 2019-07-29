import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Form = ({ updateField, postNewMessage, username, body }) => (
  <div className="form">
    <input type="text" name="username" placeholder="Username" value={username} onChange={event => updateField(event)}/>
    <textarea name="body" rows="10" cols="30" placeholder="Message body goes here" value={body} onChange={event => updateField(event)}/>
    <button name="submit" onClick={() => postNewMessage()} id="submit">Submit</button>
  </div>
)

export default Form;

Form.propTypes = {
  updateField: PropTypes.func.isRequired,
  postNewMessage: PropTypes.func.isRequired,
  username: PropTypes.string,
  body: PropTypes.string,
}