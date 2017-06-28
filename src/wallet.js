import Printer from './printer';

const colors = require('colors/safe');
const Table = require('easy-table');
const Logger = require('./logger');
const _ = require('underscore');

class Wallet {
  constructor() {
    this.results = [];
    this.table = null;
    this.bitcoin = {
      last_price: 0.0,
    };
  }

  async parse(balances) {
    try {
      await Promise.all(balances.map(coin => this.addCoin(coin)));
      return true;
    } catch (e) {
      Logger.log(e);
    }
    return false;
  }

  count() {
    return this.results.length;
  }

  addCoin(coin) {
    this.results.push(coin);
  }

  tableify() {
    if (this.table == null) {
      this.table = new Table();
    }

    const EUR_BTC = this.bitcoin.last_eur;
    let btcTotal = 0;
    _.sortBy(this.results, c => -1 * c.balance_amount_total).forEach((coin, i) => {
      const f = i % 2 ? colors.green : colors.white;
      this.table.cell('Symbol', f(coin.balance_curr_code));
      const numberOfCoins = (coin.balance_amount_total * 1).toFixed(4);
      const valueInBTC = coin.btc_balance * 1;
      btcTotal += valueInBTC;
      this.table.cell('Tokens', f(Table.padLeft(numberOfCoins, 14)));
      this.table.cell('BTC Price', f(Table.padLeft(Printer.btc(coin.last_price * 1, 14), 20)));
      this.table.cell('BTC Value', f(Table.padLeft(Printer.btc(valueInBTC * 1, 14), 20)));
      this.table.cell('EUR Value', f(Table.padLeft(Printer.eur(valueInBTC * 1 * EUR_BTC, 2), 20)));
      this.table.newRow();
    });

    this.table.total('BTC Price', {
      printer() {
        return Table.padLeft(`1 BTC = EUR ${(EUR_BTC).toFixed(2)}`, 20);
      },
    });

    this.table.total('BTC Value', {
      printer() {
        return Table.padLeft(`BTC ${btcTotal.toFixed(4)}`, 20);
      },
    });

    this.table.total('EUR Value', {
      printer() {
        return Table.padLeft(`EUR ${(btcTotal * EUR_BTC).toFixed(2)}`, 20);
      },
    });

    return this.table;
  }

  reset() {
    this.results = [];
  }
}

export default Wallet;
