import React, { Component } from 'react';

class Item extends Component {

    render() {        
      return (
        <li> {this.props.dana.id} -> {this.props.dana.nazwa}
        </li>
      );
    }
  }
  
  export default Item;