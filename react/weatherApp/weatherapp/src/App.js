import React, { Component } from 'react';
import './App.css';

// https://vimeo.com/213710634
const MIASTA = [
  {nazwa: 'ASD', zip: '12345'},
  {nazwa: 'SAD', zip: '65874'},
  {nazwa: 'fdsagdf', zip: '11122'}
];

class Weather extends Component {
  render() {
    return (
      <h1>Hello! {this.props.zip}</h1>
    );
  }
}

class App extends Component {

  mapujMiasto(miasto) {
    return (
      <button>{miasto.nazwa} - {miasto.zip}</button>
    );
  }

  render() {
    return (
      <div className="App">
       
        <Weather/>
        {MIASTA.map(this.mapujMiasto)}
      </div>
    );
  }
}

export default App;
