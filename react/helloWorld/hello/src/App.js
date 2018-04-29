import React, { Component } from 'react';
import './App.css';
import Komponent from './components/MojKomponent';

class App extends Component {

  constructor() {
    super();
    
    this.state = {
      dane: [
        {id: 4, nazwa: 'asd'},
        {id:3, nazwa:'piesel'}
      ]
    };
    
  }

  render() {
    return (
      <div className="App">
        Moja appka

        <Komponent dane={this.state.dane}/>
      </div>
    );
  }
}

export default App;
