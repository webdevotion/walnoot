import Coinigy from './coinigy';
import Wallet from './wallet';
import Extras from './extras';

require('dotenv').config();

const Logger = require('./logger');

async function coinigy() {
  const c = new Coinigy(process.env.COINIGY_KEY, process.env.COINIGY_SECRET);
  let balances;
  try {
    balances = await c.balances();
  } catch (e) {
    Logger.log('failed to get coinigy balance');
    throw e;
  }
  return balances;
}

async function extras() {
  const extrasEnv = process.env.EXTRAS.split(',');
  const coins = [];
  for (let i = 0; i < extrasEnv.length; i += 1) {
    if (i % 2 === 0) {
      const extra = Extras.extra(extrasEnv[i], 1 * extrasEnv[i + 1]);
      coins.push(extra);
    }
  }
  const e = new Extras(coins);
  const b = await e.balances();
  return b;
}

async function lambotime(balances) {
  const wallet = new Wallet();
  try {
    const parsed = await wallet.parse(balances);
    if (!parsed) {
      Logger.log('failed to parse balance');
      return null;
    }
  } catch (e) {
    Logger.log('throwing an error');
    throw e;
  }
  return wallet;
}

async function start() {
  let balances = [];

  const extraBalance = await extras();
  const btc = extraBalance.find(xtr => xtr.balance_curr_code === 'BTC');
  balances = balances.concat(extraBalance);

  const coinigyBalance = await coinigy();
  balances = balances.concat(coinigyBalance);

  const wallet = await lambotime(balances);
  if (!wallet) {
    Logger.log('no wallet with balances found, something went wrong');
    return;
  }

  if (btc !== undefined) {
    wallet.bitcoin = btc;
  }

  Logger.log(wallet.tableify());
}

start();
