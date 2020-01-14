const rp = require('request-promise');

class Extra {
  constructor(coin, balance) {
    this.coin = coin;
    this.balance = 1 * balance;
    this.result = null;
  }

  async get() {
    const url = `https://api.coinmarketcap.com/v1/ticker/${this.coin}/?convert=EUR`;
    return rp({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json,application/json',
      },
      body: '{}',
    }).then((result) => {
      const json = JSON.parse(result)[0];
      if (json == null) {
        process.stdout.write(`${this.coin} could not be parsed`);
        return null;
      }
      this.result = {
        last_usd: 1 * json.price_usd,
        last_eur: 1 * json.price_eur,
        last_price: 1 * json.price_btc,
        btc_balance: this.balance * (1 * json.price_btc),
        balance_amount_total: this.balance,
        balance_curr_code: json.symbol,
      };
      return this.result;
    });
  }

  toString() {
    return `${this.coin} • ${this.balance}`;
  }
}

export default Extra;
