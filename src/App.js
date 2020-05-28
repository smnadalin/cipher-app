import React from "react";
import "./App.css";
import Analysed from "./Analysed";

const firstLetter = "a".charCodeAt(0);
const lastLetter = "z".charCodeAt(0);

class App extends React.Component {
  constructor() {
    super();

    //Initialise state
    this.state = {
      cipherText: "",
      letterFrequency: createFrequencyArray(),
      cipherTextCharacterLength: 0,
      cipherTextLength: 0,
      cipherTextUniqueCharacters: 0,
      analysed: false,
      cipherTextSpaces: 0,
    };
  }

  //Update changes to cipherText
  handleChange = (event) => {
    this.setState({ cipherText: event.target.value });
    event.preventDefault();
  };

  //Submit cipherText for analysis
  handleSubmit = (event) => {
    event.preventDefault();
    this.analyser(this.state.cipherText);
  };

  //Analysers the ciphertext
  analyser = (str) => {
    let letterFrequencyUpdate = createFrequencyArray();
    let characterLength = 0;
    let uniqueCharacters = 0;
    let spaces = 0;

    for (let i = 0; i < str.length; i++) {
      let characterCode = str.charCodeAt(i);

      if (characterCode >= 97 && characterCode <= 122) {
        letterFrequencyUpdate[characterCode - firstLetter].frequency++;
        characterLength++;
      } else if (characterCode === 20) {
        spaces++;
      }
    }

    for (let i = 0; i < 26; i++) {
      if (letterFrequencyUpdate[i].frequency > 0) {
        uniqueCharacters++;
      }
    }

    this.setState({
      letterFrequency: letterFrequencyUpdate,
      cipherTextLength: str.length,
      cipherTextCharacterLength: characterLength,
      analysed: true,
      cipherTextUniqueCharacters: uniqueCharacters,
      cipherTextSpaces: spaces,
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1 className="headerText">Cipher Identifier and Analyser</h1>
        </header>
        <form className="cipherTextForm" onSubmit={this.handleSubmit}>
          <h3>Enter your cipher text below:</h3>
          <textarea
            onChange={this.handleChange}
            value={this.state.cipherText}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        {this.state.analysed ? (
          <Analysed
            letterFrequency={this.state.letterFrequency}
            cipherTextUniqueCharacters={this.state.cipherTextUniqueCharacters}
            cipherTextLength={this.state.cipherTextLength}
            cipherTextCharacterLength={this.state.cipherTextCharacterLength}
          />
        ) : null}
      </div>
    );
  }
}

export default App;

function createFrequencyArray() {
  let alphabet = new Array(26);
  for (let i = firstLetter; i <= lastLetter; i++) {
    alphabet[i - firstLetter] = {
      letter: String.fromCharCode(i),
      frequency: 0,
    };
  }
  return alphabet;
}
