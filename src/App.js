import React from 'react';
import './App.css';
import Today from './Today/Today';
import History from './History/History';

const App = () => (
  <div className="">
    <div className="topheader">
      <header className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="navbar-item">PusherCoins</span>
          </div>
        </nav>
      </header>
    </div>
    <section className="results--section">
      <div className="container">
        <h1>PusherCoins is a realtime price information about<br></br> BTC, ETH and LTC.</h1>
      </div>
      <div className="results--section__inner">
        <Today />
        <History />
      </div>
    </section>
  </div>
);

export default App;