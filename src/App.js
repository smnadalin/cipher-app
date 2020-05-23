import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    //Initialise state
    this.state = {
      cipherText: "",
      letterFrequency: createAlphabetArray(),
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

  //Counts the frequency of each letter
  analyser = (str) => {
    let letterFrequencyUpdate = createAlphabetArray();
    let firstLetter = "a".charCodeAt(0);
    let characterLength = 0;
    let uniqueCharacters = 0;
    let spaces = 0;

    for (let i = 0; i < str.length; i++) {
      let characterCode = str.charCodeAt(i);

      if (characterCode >= 97 && characterCode <= 122) {
        letterFrequencyUpdate[characterCode - firstLetter].frequency++;
        characterLength++;
      } else if (characterCode == 20) {
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

  renderAnalysed = () => {
    if (this.state.analysed) {
      return (
        <div className="analysisContainer">
          {this.renderSolutions(this.state.cipherTextUniqueCharacters)}
          <h4>Letter Frequency:</h4>
          <table className="frequencyTable">
            <tr>
              {this.state.letterFrequency.map((letter) => (
                <th>{letter.letter}</th>
              ))}
            </tr>
            <tr>
              {this.state.letterFrequency.map((letter) => (
                <td>{letter.frequency}</td>
              ))}
            </tr>
          </table>
          <div className="analysisStatsContainer">
            <p className="analysisStatsContent">
              <b>Unique Characters: </b>
              {this.state.cipherTextUniqueCharacters}
              <br></br>
              <b>Length (total): </b>
              {this.state.cipherTextLength}
              <br></br>
              <b>Length (characters): </b>
              {this.state.cipherTextCharacterLength}
            </p>
          </div>
        </div>
      );
    }
  };

  renderSolutions = (uniqueCharacters) => {
    let likelyCipher = "";
    if (uniqueCharacters == 2) {
      likelyCipher = (
        <div>
          <ul>
            <b>Baconian Cipher:</b>
            <br></br>Each plaintext letter is replaced by a group of five
            letters made from two characters, based on a defined alphabet.
          </ul>
          <ul>
            <b>Morse Code Cipher:</b>
            <br></br>Each plaintext letter is replaced by a group of two
            characters, based on a defined alphabet.
          </ul>
        </div>
      );
    } else if (uniqueCharacters == 5) {
      likelyCipher = (
        <div>
          <ul>
            <b>Polybius Square: </b>
            <br></br>Each plaintext letter is replaced with two letters that
            represent its row and column in a 5x5 grid.<br></br>
            As there are only 25 cells in the grid, two letters must be combined
            in one cell, typically I and J.
          </ul>
        </div>
      );
    } else if (uniqueCharacters > 5) {
      likelyCipher = (
        <div>
          <ul>
            <b>Caesar Cipher:</b>
            <br></br>Each plaintext letter is shifted a set number of characters
            in the alphabet.
          </ul>
          <ul>
            <b>Monoalphabetic Substitution:</b>
            <br></br>
            Each plaintext letter is replaced with a different letter.
          </ul>
        </div>
      );
    } else {
      <div>
        <ul>
          <b>Unknown cipher: </b>We cannot suggest a cipher based on the
          provided ciphertext.
        </ul>
      </div>;
    }
    return (
      <div className="solutionContainer">
        <h3 className="solutionHeading">Most likely ciphers:</h3>
        {likelyCipher}
      </div>
    );
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
          <button type="submit">Sumbit</button>
        </form>
        {this.renderAnalysed()}
      </div>
    );
  }
}

export default App;

function createAlphabetArray() {
  let firstLetter = "a".charCodeAt(0);
  let lastLetter = "z".charCodeAt(0);
  let alphabet = new Array(26);
  for (let i = firstLetter; i <= lastLetter; i++) {
    alphabet[i - firstLetter] = {
      letter: String.fromCharCode(i),
      frequency: 0,
    };
  }
  return alphabet;
}
