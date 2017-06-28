const rp = require('request-promise');

class Coinigy {
  constructor(key, secret) {
    this.key = key;
    this.secret = secret;
  }

  balances() {
    return rp({
      method: 'POST',
      url: 'https://api.coinigy.com/api/v1/balances',
      headers: {
        'Content-Type': 'application/json,application/json',
        'X-API-KEY': this.key,
        'X-API-SECRET': this.secret,
      },
      body: '{  "show_nils": 0,  "auth_ids": ""}',
    }).then(result => JSON.parse(result).data);
  }
}

export default Coinigy;
