const readline = require('readline');

class Gyppo {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'OHAI> ',
    });
  }

  log(s) {
    this.rl.output.write(`${s}\n`);
  }

  clear() {
    this.rl.output.write('\u001B[2J\u001B[0;0f');
    // let n = nLines;
    // while (n >= 0) {
    //   readline.cursorTo(process.stdout, 0, Math.max(0, nLines - n - 1));
    //   readline.clearLine(process.stdout, 0);
    //   n -= 1;
    // }
  }

  refresh(content) {
    this.rl.clearLine();
    this.rl.cursorTo();
    this.rl.output.write(content);
  }
}

export default Gyppo;
