const Table = require('easy-table');

class Printer {
  constructor() {
    this.name = 'Currency Printer';
  }

  static eur(val, width) {
    const str = val.toFixed(2);
    return width ? Table.padLeft(str, width) : str;
  }

  static btc(val, width) {
    const str = val.toFixed(8);
    return width ? Table.padLeft(str, width) : str;
  }

  static usd(val, width) {
    const str = val.toFixed(2);
    return width ? Table.padLeft(str, width) : str;
  }

  static pct(val, width) {
    const str = val.toFixed(4);
    return width ? Table.padLeft(str, width) : str;
  }
}

export default Printer;
