import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';

type AppProps = {
  yourName: string;
}

const App: FC<AppProps> = ({ yourName }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, {yourName}!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
