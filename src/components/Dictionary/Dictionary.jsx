import React, { Component } from 'react';

class DictionaryForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dictionary: this.props.dictionary,
      };
    }
    
  componentDidUpdate(prevProps) { // called when a prop is changed
      if (this.props.dictionary !== prevProps.dictionary){
        this.setState({
          dictionary: this.props.dictionary
        })
      }
    }

    handleChangeKey = event => {
      this.setState({
        key: event.target.value
      })
    }
  
    handleChangeValue = event => {
      this.setState({
        value: event.target.value
      })
    }
  
    handleSubmit = event => {
      event.preventDefault()
      const dictionary = this.state.dictionary
      const dictValues = Object.keys(dictionary.map)
      const dictKeys = Object.values(dictionary.map)
      
      if (dictKeys.includes(this.state.key) & 
      dictValues.includes(this.state.value)) {
        alert("Cycles. Two or more rows in a dictionary result in cycles,")
        return
      } else if (dictValues.includes(this.state.key) &
      (dictKeys.includes(this.state.value))) {
        alert("Duplicates. Duplicate Domain - Range pairs")
        return
      } else if (dictValues.includes(this.state.key)){
        alert("Forks. Duplicate Domains with different Ranges")
        return
      } else if (dictValues.includes(this.state.value)){
        alert("Chains. A chain structure in the dictionary")
        return
      }
      dictionary.map[this.state.key]=this.state.value
      this.setState({
        dictionary
      });
    }
  
    createContent() {
      const keysElem = Object.keys(this.state.dictionary.map)
      const valueList = [];
      for (let i = 0; i < keysElem.length; i++) {
        const key = keysElem[i];
        const value = this.state.dictionary.map[key]
        valueList.push(<tr onClick={(e)=>this.modifyContent(e, key)} key={key}>
          <td >
            {this.createKeyInput(key, key)}
          </td>
          <td>
            {this.createValueInput(key, value)}
          </td>
          <td><button onClick={() => this.deleteContent(key)}>Delete</button></td>
        </tr>)
      }
      return valueList
    };

    displayTitle() {
      return this.state.dictionary.name
    }
  
    createValueInput(key, value) {
      if (this.state.editedRowKey === key) {
        return <input defaultValue={value} 
         onChange={(e)=>this.handleValueChange(e)} 
         onBlur={(e)=>this.handleBlur(key)}
         ></input>
      } else {
        return value
      }
    }  
  
    createKeyInput(key, value) {
      if (this.state.editedRowKey === key) {
        return <input defaultValue={value} 
          onChange={(e)=>this.handleKeyChange(e)} 
          onBlur={(e)=>this.handleBlur(key)}>
        </input>
      } else {
        return value
      }
    } 
  
    handleBlur(key) {
      delete this.state.editedRowKey
      this.setState(this.state)
      this.updateKey(key)
      this.updateValue(key)
      this.newValue = null
      this.newKey = null
    }

    handleKeyChange(e) {
      this.newKey = e.target.value;
    }

    handleValueChange(e) {
      this.newValue = e.target.value;
    }
  
    updateKey(key) {
      if (this.newKey && key !== this.newKey){
          const updatedKey = { ...this.state.dictionary.map }
          updatedKey[this.newKey] = updatedKey[key];
          delete updatedKey[key];
          this.setState({ dictionary: { map: updatedKey }})
      }
    }
  
    updateValue(key) {
      if (!this.newValue) {
        return
      }
      const updatedValue = { ...this.state.dictionary.map }
      updatedValue[key] = this.newValue
      this.setState({ dictionary: { map: updatedValue }})
    };
  
    deleteContent(key) {
      delete this.state.dictionary.map[key]
      this.setState(this.state)
    };
  
    modifyContent(e, key, value) { // select the line to modify
      this.setState({
        editedRowKey: key 
      });
    };
  
    render() {
      return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>{this.displayTitle()}</h3>
          <input type="text" placeholder="enter domain" onChange={(e)=>this.handleChangeKey(e)} />
          <input type="text" placeholder="enter range" onChange={(e)=>this.handleChangeValue(e)} />
          <button type="submit" >New Row</button>
        </form>
        <table>
          <thead>
            <tr>
              <th scope="col">Domain</th>
              <th scope="col">Range</th>
            </tr>
          </thead>
          <tbody className="cursor">
              {this.createContent()}
          </tbody>
        </table> 
      </div>)
    }  
  }
  
  export default DictionaryForm;
  