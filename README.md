# walnoot

Command line tool to get a quick look into your current crypto wallets.
Integration with [Coinigy](https://www.coinigy.com/?r=6a5bc432).
Plus you can add coins / number of coins manually via a simple `.env` file.

[![walnoot-tabular.png](https://i.postimg.cc/XJyPxzck/Screenshot-2020-01-14-at-12-22-02.png)](https://postimg.cc/ftD5R5PV)

1/ First version of usage:
--
- clone this repo
- `cd` into the repo folder ( probably `$ cd walnoot` )
- copy `.env.example` to `.env` and edit the file

2A/ Run locally on your host OS:
--
- run `$ yarn` or `$ npm install` to install dependencies
- run `$ yarn start` to lint, build and run from the `lib` folder

2B/ Or use the provided Dockerfile
-- 
- build the local docker image
  - `docker build --tag webdevotion/node-12-yarn .`
- run the docker image: 
  - `docker run -v ${PWD}:/app --rm -it webdevotion/node-12-yarn /bin/sh`

3/ Result
--
- if build succeeds you should see a nice tabular overview of your cryptowallet
- once build you can use the include `wallet` shell script
