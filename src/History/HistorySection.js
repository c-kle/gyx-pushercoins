import React from 'react';
import './HistorySection.css';

const HistorySection = ({ date, eth, btc, ltc }) => (
  <div className="history--section__box__inner">
    <h4>{date}</h4>
    <div className="columns">
      <div className="column">
        <p>1 BTC = ${btc}</p>
      </div>
      <div className="column">
        <p>1 ETH = ${eth}</p>
      </div>
      <div className="column">
        <p>1 LTC = ${ltc}</p>
      </div>
    </div>
  </div>
);

export default HistorySection;