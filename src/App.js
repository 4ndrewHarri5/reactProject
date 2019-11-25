import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot }  from 'radium';
import Person from './Person/Person';

class App extends Component{

  state = {
    persons: [
      {name: 'Andrew', age: 19, uID: 'hwef73qgwe'}, 
      {name: 'Harris', age: 20, uID: 'hqk78f74f2'} 
    ],
    showPersons: false
  };

  deletePersonHandler = (index) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const currentShow = this.state.showPersons
    this.setState({
      showPersons: !currentShow
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.uID === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };

    //set name to person
    person.name = event.target.value;

    //now update array at index
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //then set the state
    this.setState({persons: persons});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid #eee',
      padding: '8px',
      borderRadius: '50vh',
      boxShadow: '0 0px 20px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => { 
          return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key={person.uID}
            changed={(event) => this.nameChangedHandler(event, person.uID)}
            />
          })}
        </div>
      );

      style.backgroundColor = 'red';

      style[":hover"].backgroundColor = 'salmon';

    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'bold']
    }

    return(
      <StyleRoot> 
        <div className="App">
          <h1>First React App</h1>
          <p className={classes.join(' ')}>Testing changing class names</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}
          >Toggle People</button>
          {persons}
        </div> 
      </StyleRoot>
    );
  }
};

export default Radium(App);

