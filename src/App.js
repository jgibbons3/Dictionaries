
import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header.jsx'
import Dictionary from './components/Dictionary/Dictionary.jsx';
import NewDictionary from './components/NewDictionary/NewDictionary.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDictionary: null,
      dictionaries: [
        {name: 'Dictionary 1', map: { key1: "value1", key2: "value2"}},
        {name: 'Dictionary 2', map: { def: "hola", zxw: "chau"}}
      ],
    };
  }
  addDict = (name) => {
    const dict = {name: name, map: { }}
    const dictionaries = [...this.state.dictionaries, dict]
    this.setState({
      dictionaries: dictionaries
    })
  } 

  displayDictionaries = (d) => {
    this.setState({
      editDictionary: d
    })
  }

  renderForm() {
    if(this.state.editDictionary !=null) {
      return <Dictionary dictionary={this.state.editDictionary} />
    }
  }

  deleteDictionary(i) {
    console.log(i)
    const undeletedDict = this.state.dictionaries.filter((d, index) => index !== i) 
    console.log(undeletedDict)
    this.setState({
      dictionaries: undeletedDict
    })
  }

  render(){
    return(
    <div id="body">
      <div id="upperBar">
        <Header />
        <NewDictionary addDict={this.addDict}/>
      </div>

      <div id="main">
        <div id="titles">
        {
          this.state.dictionaries.map((d, i) =>
          <p key={i}>
            <span className="cursor" onClick={() => this.displayDictionaries(d)}>{d.name}</span>
            <button onClick={() => this.deleteDictionary(i)}>Delete</button>
          </p>)
          
        }
        </div>
        <div id="data">
          {this.renderForm()}
        </div>
      </div>

    </div>
    )
  }
}
export default App;