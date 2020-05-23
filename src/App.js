import React from 'react';
import './App.css';

class App extends React.Component
{
  constructor()
  {
    super();
   
    //Initialise state
    this.state = {cipherText: "test",
                  numberFrequency: createAlphabetArray()};
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
    let numberFrequencyUpdate = createAlphabetArray();
    let firstLetter = "a".charCodeAt(0);

    for (let i = 0; i < str.length; i++)
    {
      let characterCode = str.charCodeAt(i);
      
      if (characterCode >= 97 && characterCode <= 122)
      {
        numberFrequencyUpdate[characterCode - firstLetter].frequency++;
      }
    }

    this.setState(
        {numberFrequency: numberFrequencyUpdate}
      )
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
      <ul className="frequencyList">
        {this.state.numberFrequency.map(letter => <li key={letter.letter}>{letter.letter}: {letter.frequency},</li>)}
      </ul>
      </div>
  }
}

export default App;

function createAlphabetArray()
{
  let firstLetter = "a".charCodeAt(0);
  let lastLetter = "z".charCodeAt(0);
  let alphabet = new Array(26);
  for (let i = firstLetter; i <= lastLetter; i++)
  {
    alphabet[i - firstLetter] = {letter: String.fromCharCode(i),
                                frequency: 0};
  }
  return alphabet;
}
