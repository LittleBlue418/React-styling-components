import React from 'react';
// import './Person.css';
// import Radium from 'radium';               - RADIUM
// import styled from 'styled-components';    - STYLED COMPONENTS
import classes from './Person.module.css';

// const StyledDiv = styled.div`              - STYLED COMPONENTS
//       width: 60%;
//       margin: auto;
//       border: 1px solid #eee;
//       box-shadow: 0 2px 3px #ccc;
//       padding: 16px;
//       text-align: center;
//       margin-top: 3%;
//       margin-bottom: 3%;

//       @media (min-width: 500px) {
//         width: 450px;
//       }
//     `

const person = (props) => {
  //const style = {                            - RADIUM
  //  '@media(min-width: 500px)': {
  //    width: '450px'
  //  }
  //}

  return (
    // <div className="Person" style={style}>   - RADIUM
    // <StyledDiv>                              - STYLED COMPONENTS
    <div className={classes.Person}>
      < p onClick = { props.click } > I'm {props.name} and I am {props.age} years old!</p>
      < p > { props.children }</p >
        <input type="text" onChange={props.changed} value={props.name} />
    </div>
    // </StyledDiv>

  )
};

// export default Radium(person);       - RADIUM
export default person;