import React, { useState, useEffect } from 'react';
import './Today.css';
import socketIOClient from 'socket.io-client';

const Today = () => {
  const [prices, setPrices] = useState({
    btcprice: '',
    ltcprice: '',
    ethprice: ''
  });

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001');
    socket.on("coin-Price", data => {
      setPrices({
        btcprice: data.BTC.USD,
        ethprice: data.ETH.USD,
        ltcprice: data.LTC.USD
      })
    });
  }, []);

  return (
    <div className="today--section container">
      <h2>Current Price</h2>
      <div className="columns today--section__box">
        <div className="column btc--section">
          <h5>${prices.btcprice}</h5>
          <p>1 BTC</p>
        </div>
        <div className="column eth--section">
          <h5>${prices.ethprice}</h5>
          <p>1 ETH</p>
        </div>
        <div className="column ltc--section">
          <h5>${prices.ltcprice}</h5>
          <p>1 LTC</p>
        </div>
      </div>
    </div>
  )
}

export default Today;