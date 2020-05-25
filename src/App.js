import React from "react";
import "./App.css";

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

  stringPositionReplace = (str, position, newCharacter) => {
    let startString = position === 0 ? "" : str.substring(0, position);
    let endString =
      position === str.length - 1
        ? ""
        : str.substring(position + 1, str.length);
    return startString + newCharacter + endString;
  };

  balconianCodeGenerator = (str, position) => {
    if (str.charAt(position) === "a") {
      return this.stringPositionReplace(str, position, "b");
    } else {
      return this.balconianCodeGenerator(
        this.stringPositionReplace(str, position, "a"),
        position - 1
      );
    }
  };

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

  renderAnalysed = () => {
    if (this.state.analysed) {
      return (
        <div className="analysisContainer">
          {this.renderSolutions(this.state.cipherTextUniqueCharacters)}
          <h4>Letter Frequency:</h4>
          <table className="frequencyTable">
            <thead>
              <tr>
                {this.state.letterFrequency.map((letter) => (
                  <th key={letter.letter}>{letter.letter}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {this.state.letterFrequency.map((letter) => (
                  <td key={letter.letter}>{letter.frequency}</td>
                ))}
              </tr>
            </tbody>
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

  renderBalconianTableBody = () => {
    let balconianTable = new Array(24);
    let j = firstLetter;
    let letter = "";
    let code = "aaaaa";
    for (let i = 0; i < 24; i++) {
      if (i === 8) {
        letter = "i/j";
        j += 2;
      } else if (i === 19) {
        letter = "u/v";
        j += 2;
      } else {
        letter = String.fromCharCode(j);
        j++;
      }

      if (i > 0) {
        code = this.balconianCodeGenerator(code, 4);
      }

      balconianTable[i] = {
        letter: letter,
        code: code,
      };
    }

    return balconianTable.map((row) => (
      <tr key={"balconian" + row.letter}>
        <td key={"balconianLetter" + row.letter}>{row.letter}</td>
        <td key={"balconianCode" + row.letter}>{row.code}</td>
      </tr>
    ));
  };

//  renderPolybiusTable = () =>
//  {
//    let polybiusKey = "abcdefghiklmnopqrstuvwxyz";
//    for (var i = 0; i < 5; i++)
//    {
        //<tr>
//      for (var j = 0; j < 6; j++)
//      {
//        <td></td>

//      }
        //</tr></tr></tr>
//    }
//  }

//this is a test update

  renderSolutions = (uniqueCharacters) => {
    let likelyCipher = "";
    if (uniqueCharacters === 2) {
      likelyCipher = (
        <div>
          <ul>
            <b>Baconian Cipher:</b>
            <br></br>Each plaintext letter is replaced by a group of five
            letters made from two characters, based on a defined alphabet.
          </ul>
          <table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>{this.renderBalconianTableBody()}</tbody>
          </table>
          <ul>
            <b>Morse Code Cipher:</b>
            <br></br>Each plaintext letter is replaced by a group of two
            characters, based on a defined alphabet.
          </ul>
        </div>
      );
    } else if (uniqueCharacters === 5) {
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
      likelyCipher = (
        <div>
          <ul>
            <b>Unknown cipher: </b>We cannot suggest a cipher based on the
            provided ciphertext.
          </ul>
        </div>
      );
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
          <button type="submit">Submit</button>
        </form>
        {this.renderAnalysed()}
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
