import React, { useState, useEffect } from 'react';
import './Today.css';
import axios from 'axios';

const Today = () => {
  const [prices, setPrices] = useState({
    btcprice: '',
    ltcprice: '',
    ethprice: ''
  });

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(response => {
        setPrices({
          btcprice: response.data.BTC.USD,
          ethprice: response.data.ETH.USD,
          ltcprice: response.data.LTC.USD
        });
      })
      .catch(error => {
        console.log(error)
      });
  });

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