import React from 'react';
import './App.css';

class App extends React.Component
{
  constructor()
  {
    super();
   
    //Initialise state
    this.state = {cipherText: "",
                  letterFrequency: createAlphabetArray(),
                  cipherTextCharacterLength: 0,
                  cipherTextLength: 0,
                  cipherTextUniqueCharacters: 0,
                  analysed: false};
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
    let letterFrequencyUpdate = createAlphabetArray();
    let firstLetter = "a".charCodeAt(0);
    let characterLength = 0;
    let uniqueCharacters = 0;

    for (let i = 0; i < str.length; i++)
    {
      let characterCode = str.charCodeAt(i);
      
      if (characterCode >= 97 && characterCode <= 122)
      {
        letterFrequencyUpdate[characterCode - firstLetter].frequency++;
        characterLength++;
      }
    }

    for (let i = 0; i < 26; i++)
    {
      if (letterFrequencyUpdate[i].frequency > 0)
      {
        uniqueCharacters++;
      }
    }

    this.setState(
        {letterFrequency: letterFrequencyUpdate,
        cipherTextLength: str.length,
        cipherTextCharacterLength: characterLength,
        analysed: true,
        cipherTextUniqueCharacters: uniqueCharacters}
      )
  }

  renderAnalysed = () =>
  {
    if (this.state.analysed)
    {
      return <div className="analysisContainer">
      <h4>Letter Frequency:</h4>
      <table className="frequencyTable">
        <tr>{this.state.letterFrequency.map(letter => <th>{letter.letter}</th>)}</tr>
        <tr>{this.state.letterFrequency.map(letter => <td>{letter.frequency}</td>)}</tr>
      </table>
      <div className="analysisStatsContainer">
        <p className="analysisStatsContent">
          <b>Unique Characters: </b>{this.state.cipherTextUniqueCharacters}<br></br>
          <b>Length (total): </b>{this.state.cipherTextLength}<br></br>
          <b>Length (characters): </b>{this.state.cipherTextCharacterLength}
        </p>
      </div>
    </div>
    }
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
      {this.renderAnalysed()}
      
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
