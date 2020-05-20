import React from 'react';
import './App.css';

class App extends React.Component
{
  constructor()
  {
    super();
   
    //Initialise state
    this.state = {cipherText: "test",
                  ...createAlphabetObject()};
  }

  //Update changes to cipherText
  handleChange = (event) =>
  {
    this.setState(
      {cipherText: event.target.value}
    )
    event.preventDefault();
  }

  //Submit cipherText for analysis
  handleSubmit = (event) =>
  {
    event.preventDefault();
    this.letterFrequency(this.state.cipherText);

  }

  //Counts the frequency of each letter
  letterFrequency = (str) =>
  {
    for (let i = 0; i < str.length; i++)
    {
      let character = str.charAt(i);
      console.log(character);
      this.setState(prevState => (
        {[character]: prevState[character] + 1}
      )
      )
      
    }
    console.log(this.state);
  }

  render() 
  {
    return <div>
      <header>
        <h1 className="headerText">Cipher Identifier and Analyser</h1>
      </header>
      <form className="cipherTextForm" onSubmit={this.handleSubmit}>
          <h3>Enter your cipher text below:</h3>
          <textarea onChange={this.handleChange} value={this.state.cipherText}></textarea>
          <button type="submit">Sumbit</button>
      </form>
    <h4>A frequency is {this.state.a}, B frequency is {this.state.b}, C frequency is {this.state.c}...</h4>
      </div>
  }
}

export default App;

function createAlphabetObject()
{
  let firstLetter = "a".charCodeAt(0);
  let lastLetter = "z".charCodeAt(0);
  let alphabet = {};
  for (let i = firstLetter; i <= lastLetter; i++)
  {
    alphabet[String.fromCharCode(i)] = 0;
  }
  return alphabet;
}
