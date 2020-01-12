import React, { Component } from 'react';
import './NewDictionary.css';

class NewDictionary extends Component {

   handleNameInput= (e) => {
    this.setState({
        name: e.target.value
    })
   }

   handleSubmit = event => {
    event.preventDefault()
    this.props.addDict(this.state.name)
  }

  render() {
    return (
      <div id="newdict" className="NewDictionary">
        <form onSubmit={(e) =>this.handleSubmit(e)}>

            <input placeholder="new dictionary name"
            type="text"  onChange={(e)=>this.handleNameInput(e)}/>

            <button type="submit">Create New</button>

        </form>   
      </div>
      
    )
  }
}

export default NewDictionary;