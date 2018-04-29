import React, { Component } from 'react';
import Item from './Item';

class Komponent extends Component {

    render() {
        // console.log(this.props.dane);


      return (
        <div>
        <ul>
            {
                this.props.dane.map(el =>{
                    return <Item key={el.id} dana={el}/>
                })
            }
        </ul>
        </div>
      );
    }
  }
  
  export default Komponent;