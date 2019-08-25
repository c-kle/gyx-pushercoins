import React, { useEffect, useState } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';
import HistorySection from './HistorySection';

const makeGetCoinPricesOnDate = (coin) => (date) => (
  axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=USD&ts=${date}`)
);

const getETHPricesOnDate = makeGetCoinPricesOnDate('ETH');
const getBTCPricesOnDate = makeGetCoinPricesOnDate('BTC');
const getLTCPricesOnDate = makeGetCoinPricesOnDate('LTC');

const makeGetPricesOn = (momentDate) => () => new Promise((resolve) =>
  axios.all([
    getETHPricesOnDate(momentDate),
    getBTCPricesOnDate(momentDate),
    getLTCPricesOnDate(momentDate)
  ]).then(axios.spread((eth, btc, ltc) => {
    resolve({
      date: moment.unix(momentDate).format("MMMM Do YYYY"),
      eth: eth.data.ETH.USD,
      btc: btc.data.BTC.USD,
      ltc: ltc.data.LTC.USD
    });
  }))
);

const today = moment().unix();
const yesterday = moment().subtract(1, 'days').unix();
const twoDaysAgo = moment().subtract(2, 'days').unix();
// const threeDaysAgo = moment().subtract(3, 'days').unix();
// const fourDaysAgo = moment().subtract(4, 'days').unix();

const getTodaysPrices = makeGetPricesOn(today);
const getYesterdaysPrices = makeGetPricesOn(yesterday);
const getTwoDaysAgoPrices = makeGetPricesOn(twoDaysAgo);
// const getThreeDaysAgoPrices = makeGetPricesOn(threeDaysAgo);
// const getFourDaysAgoPrices = makeGetPricesOn(fourDaysAgo);

const History = () => {
  const [historyPrices, setHistoryPrices] = useState({
    todayprice: {},
    yesterdayprice: {},
    twodaysprice: {},
    threedaysprice: {},
    fourdaysprice: {}
  });

  useEffect(() => {
    Promise.all([
      getTodaysPrices(),
      getYesterdaysPrices(),
      getTwoDaysAgoPrices(),
      // getThreeDaysAgoPrices(),
      // getFourDaysAgoPrices(),
    ]).then(([todayprice, yesterdayprice, twodaysprice]) =>
      setHistoryPrices({
        ...historyPrices,
        todayprice,
        yesterdayprice,
        twodaysprice,
        // threedaysprice,
        // fourdaysprice
      })
    );
  }, []);

  return (
    <div className="history--section container">
      <h2>History (Past 5 days)</h2>
      <div className="history--section__box">
        <HistorySection {...historyPrices.todayprice} />
        <HistorySection {...historyPrices.yesterdayprice} />
        <HistorySection {...historyPrices.twodaysprice} />
        <HistorySection {...historyPrices.threedaysprice} />
        <HistorySection {...historyPrices.fourdaysprice} />
      </div>
    </div>
  );
}

export default History;
