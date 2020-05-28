import React from "react";
import "./App.css";
import Solutions from "./Solutions";

class Analysed extends React.Component {
  render() {
    return (
      <div className="analysisContainer">
        <Solutions uniqueCharacters={this.props.cipherTextUniqueCharacters} />
        <h4>Letter Frequency:</h4>
        <table className="frequencyTable">
          <thead>
            <tr>
              {this.props.letterFrequency.map((letter) => (
                <th key={letter.letter}>{letter.letter}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.props.letterFrequency.map((letter) => (
                <td key={letter.letter}>{letter.frequency}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="analysisStatsContainer">
          <p className="analysisStatsContent">
            <b>Unique Characters: </b>
            {this.props.cipherTextUniqueCharacters}
            <br></br>
            <b>Length (total): </b>
            {this.props.cipherTextLength}
            <br></br>
            <b>Length (characters): </b>
            {this.props.cipherTextCharacterLength}
          </p>
        </div>
      </div>
    );
  }
}

export default Analysed;
