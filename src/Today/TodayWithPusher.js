import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

class TodayWithPusher extends Component {
  // Adds a class constructor that assigns the initial state values:
  constructor() {
    super();
    this.state = {
      btcprice: '',
      ltcprice: '',
      ethprice: ''
    };
  }

  // This is called when an instance of a component is being created and inserted into the DOM.
  componentWillMount() {
    // establish a connection to Pusher
    this.pusher = new Pusher('2cef6fdd6e9d137d550e', {
      cluster: 'eu',
      encrypted: true
    });
    // Subscribe to the 'coin-prices' channel
    this.prices = this.pusher.subscribe('coin-prices');

    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(response => {
        // We set the latest prices in the state to the prices gotten from Cryptocurrency.
        this.setState({ btcprice: response.data.BTC.USD });
        this.setState({ ethprice: response.data.ETH.USD });
        this.setState({ ltcprice: response.data.LTC.USD });
      })
      // Catch any error here
      .catch(error => {
        console.log(error)
      })

    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(response => {
          this.sendPricePusher(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, 10000);

    // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes 
    this.prices.bind('prices', price => {
      this.setState({ btcprice: price.prices.BTC.USD });
      this.setState({ ethprice: price.prices.ETH.USD });
      this.setState({ ltcprice: price.prices.LTC.USD });
    }, this);
  }

  sendPricePusher(data) {
    axios.post('/prices/new', {
      prices: data
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // The render method contains the JSX code which will be compiled to HTML.
  render() {
    return (
      <div className="today--section container">
        <h2>Current Price</h2>
        <div className="columns today--section__box">
          <div className="column btc--section">
            <h5>${this.state.btcprice}</h5>
            <p>1 BTC</p>
          </div>
          <div className="column eth--section">
            <h5>${this.state.ethprice}</h5>
            <p>1 ETH</p>
          </div>
          <div className="column ltc--section">
            <h5>${this.state.ltcprice}</h5>
            <p>1 LTC</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TodayWithPusher;
