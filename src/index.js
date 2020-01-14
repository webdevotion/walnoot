import Coinigy from './coinigy';
import Wallet from './wallet';
import Extras from './extras';
import Gyppo from './gyppo';

require('dotenv').config();

const logger = new Gyppo();

async function coinigy() {
  const c = new Coinigy(process.env.COINIGY_KEY, process.env.COINIGY_SECRET);
  let balances;
  try {
    balances = await c.balances();
  } catch (e) {
    logger.log('failed to get coinigy balance');
    throw e;
  }
  return balances;
}

async function extras() {
  if (typeof process.env.EXTRAS === 'undefined') {
    logger.log('make sure your .env file is in place and valid');
    return null;
  }
  logger.log('==========');
  logger.log(process.env.EXTRAS);
  logger.log('==========');
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
    logger.log(balances);
    const parsed = await wallet.parse(balances);
    if (!parsed) {
      logger.log('failed to parse balance');
      return null;
    }
  } catch (e) {
    logger.log('throwing an error');
    return null;
  }
  return wallet;
}

let lastResult;
async function start() {
  logger.log('reloading ...');
  let balances = [];

  const extraBalance = await extras();
  logger.log(typeof extraBalance);
  logger.log(JSON.stringify(extraBalance));
  if (extraBalance == null) {
    logger.log('no balances were found, is your .env in place?');
    return;
  }


  const btc = extraBalance.find(xtr => xtr.balance_curr_code === 'BTC');
  balances = balances.concat(extraBalance);

  const coinigyBalance = await coinigy();
  balances = balances.concat(coinigyBalance);

  const wallet = await lambotime(balances);
  if (!wallet) {
    logger.log('no wallet with balances found, something went wrong');
    return;
  }

  if (btc !== undefined) {
    wallet.bitcoin = btc;
  }

  wallet.tableify().then((table) => {
    lastResult = table.toString();
    logger.log(lastResult);
    return btc;
  }).catch((error) => {
    logger.log(error.message);
  });

  logger.clear();
  setTimeout(start, 60000);
}

start();
