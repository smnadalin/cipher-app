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
          <h3>Enter your cipher text below:</h3>
          <textarea></textarea>
          <button type="submit">Sumbit</button>
      </form>
      </div>
    
  }
}

export default App;
