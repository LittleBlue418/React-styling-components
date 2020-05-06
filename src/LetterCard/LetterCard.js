import React from 'react';
import './Lettercard.css'

const letterCard = (props) => {
  return (
    <div className="LetterCard" onClick={props.click}>
      <h3>{props.letter}</h3>
    </div>
  )
};

export default letterCard;