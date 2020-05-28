import React from "react";
import "./App.css";

const firstLetter = "a".charCodeAt(0);

class Solutions extends React.Component {
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
            <tbody>{this.renderbaconianTableBody()}</tbody>
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

  renderbaconianTableBody = () => {
    let baconianTable = new Array(24);
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
        code = this.baconianCodeGenerator(code, 4);
      }

      baconianTable[i] = {
        letter: letter,
        code: code,
      };
    }

    return baconianTable.map((row) => (
      <tr key={"baconian" + row.letter}>
        <td key={"baconianLetter" + row.letter}>{row.letter}</td>
        <td key={"baconianCode" + row.letter}>{row.code}</td>
      </tr>
    ));
  };

  baconianCodeGenerator = (str, position) => {
    if (str.charAt(position) === "a") {
      return this.stringPositionReplace(str, position, "b");
    } else {
      return this.baconianCodeGenerator(
        this.stringPositionReplace(str, position, "a"),
        position - 1
      );
    }
  };

  stringPositionReplace = (str, position, newCharacter) => {
    let startString = position === 0 ? "" : str.substring(0, position);
    let endString =
      position === str.length - 1
        ? ""
        : str.substring(position + 1, str.length);
    return startString + newCharacter + endString;
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

  render() {
    return this.renderSolutions(this.props.uniqueCharacters);
  }
}

export default Solutions;
