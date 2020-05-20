import React from 'react';
import './App.css';

class App extends React.Component
{
  constructor()
  {
    super();
    this.state = {cipherText: ""};
  }

  handleChange = (event) =>
  {
    this.setState(
      {cipherText: event.target.value}
    )

    event.preventDefault();
  }

  handleSubmit = (event) =>
  {
    event.preventDefault();
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
      </div>
    
  }
}

export default App;
