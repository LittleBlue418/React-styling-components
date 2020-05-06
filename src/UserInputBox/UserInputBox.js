import React from 'react';
import './UserInputBox.css';

const userInputBox = (props) => {
  return (
    <div className="UserInputBox">
      <h4>Letter Count</h4>
      <p>Enter your first name</p>
      <input type="text" onChange={props.changed} value={props.userText}></input>
      <p>That's {props.length} characters long!</p>
    </div>
  )
};

export default userInputBox;