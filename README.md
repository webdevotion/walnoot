# walnoot

Command line tool to get a quick look into your current crypto wallets.
Integration with [Coinigy](https://www.coinigy.com/?r=6a5bc432).
Plus you can add coins / number of coins manually via a simple `.env` file.

[![walnoot-tabular.png](https://s12.postimg.org/thwcofbel/walnoot-tabular.png)](https://postimg.org/image/t54yi8t4p/)

First version of usage:
- clone this repo
- `cd` into the repo folder ( probably `$ cd walnoot` )
- copy `.env.example` to `.env` and edit the file
- run `$ yarn` or `$ npm install` to install dependencies
- run `$ yarn start` to lint, build and run from the `lib` folder
- if build succeeds you should see a nice tabular overview of your cryptowallet
- once build you can use the include `wallet` shell script
