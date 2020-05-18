import React from 'react';
import './App.css';

class App extends React.Component
{
  render() 
  {
    return <div>
      <header>
        <h1 className="headerText">Cipher Identifier and Analyser</h1>
      </header>
      <form className="cipherTextForm">
          <p>Enter your cipher text below</p>
          <label for="cipherText">Cipher Text:</label>
          <input type="text"></input>
          <button type="submit">Sumbit</button>
      </form>
      </div>
    
  }
}

export default App;
