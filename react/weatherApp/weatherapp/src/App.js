import React, { Component } from 'react';
import './App.css';

// https://vimeo.com/213710634
const MIASTA = [
  {nazwa: 'ASD', zip: '12345'},
  {nazwa: 'SAD', zip: '65874'},
  {nazwa: 'fdsagdf', zip: '11122'}
];

const stylik = {
  border: '5px dotted lightBlue',
  fontFamily: 'Arial'
}

class Weather extends Component {
  
  render() {
    return (
      <div className="asd-styl">
        <h1 style={stylik}>Hello! {this.props.zip}</h1>
      </div>
    );
  }
}

class App extends Component {

  mapujMiasto(miasto) {
    return (
      <button style={{margin: '5px'}}>{miasto.nazwa} - {miasto.zip}</button>
    );
  }

  render() {
    return (
      // nie da sie wstawic stylu do
      // wlasnego komponentu

      <div className="App"> 
        <Weather/>
        
        { MIASTA.map(this.mapujMiasto) }
      </div>
    );
  }
}

export default App;
