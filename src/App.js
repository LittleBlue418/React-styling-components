import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import UserInputBox from './UserInputBox/UserInputBox'
import LetterCard from './LetterCard/LetterCard';



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
      newUserTextArray.push({id: index, letter: event.target.value[letter]})
      index ++;
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
    const buttonStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

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
      )
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

    return (
      <div className="App">

        <UserInputBox
          changed={(event) => this.userEnteredText(event)}
          userText={this.state.userText}
          length={this.state.userTextArray.length} />

        {letterCards}

        <h1>The Fam</h1>
        <button
          style={buttonStyle}
          onClick={this.togglePersonsHandler}>Show People</button>

        {persons}

      </div>
      //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m a React App!!!'))
    );
  }
}

export default App;