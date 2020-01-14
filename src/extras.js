import Extra from './extra';

class Extras {
  constructor(extras) {
    this.extras = extras;
  }

  async balances() {
    let b = [];
    try {
      await Promise.all(this.extras.map((extra) => extra.get().then((result) => {
        if (result == null) {
          return null;
        }
        b.push(result);
        return result;
      })));
      b = b.filter((item) => item != null);
    } catch (e) {
      process.stdout.write('unable to fetch extras balances');
      process.stdout.write(e);
    }
    return b;
  }

  static extra(coin, balance) {
    return new Extra(coin, balance);
  }
}

export default Extras;
