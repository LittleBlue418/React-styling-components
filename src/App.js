import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';
// import Radium, { StyleRoot } from 'radium';          -RADIUM STYLEROOT
// import styled from 'styled-components';

import UserInputBox from './UserInputBox/UserInputBox'
import LetterCard from './LetterCard/LetterCard';

// const StyledButton = styled.button`
//   background-color: ${props => props.altStyle ? 'red' : 'green'};
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
//   color: white;

//   &:hover {
//     background-color: ${props => props.altStyle ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

class App extends Component {
  state = {
    persons: [
      { id: 'sbv7a', name: 'Holly', age: 32, hobbies: 'Writing' },
      { id: 'lnx4', name: 'Martin', age: 41, hobbies: 'Programming' },
      { id: 'kc3nos', name: 'Morris', age: 11, hobbies: 'Sleeping' },
    ],
    otherState: 'Some other value',
    showPersons: false,
    userText: '',
    userTextArray: {},
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = { ...this.state.persons[personIndex] };
    // const person = Object.assign({}, this.state.persons[personIndex]);  <- old method

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  userEnteredText = (event) => {
    const newUsertext = event.target.value;

    const newUserTextArray = []
    let index = 0;

    for (let letter in event.target.value) {
      newUserTextArray.push({ id: index, letter: event.target.value[letter] })
      index++;
    }

    this.setState(
      this.state = {
        userText: newUsertext,
        userTextArray: newUserTextArray,
      }
    )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();  <- old method
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  deleteLetterCard = (cardIndex) => {
    const newUserTextArray = [...this.state.userTextArray];
    const newUserTextHolder = this.state.userText.split("");

    newUserTextArray.splice(cardIndex, 1);

    newUserTextHolder.splice(cardIndex, 1);

    const newUserText = newUserTextHolder.join("");

    this.setState(
      this.state = {
        userText: newUserText,
        userTextArray: newUserTextArray
      }
    )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    //  const buttonStyle = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   color: 'white',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let persons = null;
    let letterCards = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      // buttonStyle.backgroundColor = 'red';
      // buttonStyle[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }

    }

    if (this.state.userTextArray.length > 0) {
      letterCards = (
        <div>
          {this.state.userTextArray.map((letterObject, index) => {
            return <LetterCard
              click={() => this.deleteLetterCard(index)}
              letter={letterObject.letter}
              key={letterObject.id} />
          })}
        </div>
      )
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // <StyleRoot>            -RADIUM STYLEROOT
        <div className="App">

          <UserInputBox
            changed={(event) => this.userEnteredText(event)}
            userText={this.state.userText}
            length={this.state.userTextArray.length} />

          {letterCards}

          <h1>The Fam</h1>
          <p className={classes.join(' ')}>The family members!</p>
          <StyledButton
            // style={buttonStyle}
            altStyle={this.state.showPersons}
            onClick={this.togglePersonsHandler}>
              Show People
          </StyledButton>

          {persons}

        </div>
      // </StyleRoot>         -RADIUM STYLEROOT
    );
  }
}

export default Radium(App);
