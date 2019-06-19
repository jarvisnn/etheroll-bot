## [Etheroll](https://etheroll.com/) Bot

A simple bot to simulate **Rolling-Under** in **[Etheroll](https://etheroll.com/)**, using **[Martingale](https://tinyurl.com/ld834fa)** strategy. Some using this strategy and won a few thousands. Unfortunately I lost.

Doing a quick analyze on the past rolls, the most effective rolls are **32** and **48** (don't know why, you can check it yourself).

Fell free to edit the bot in your way. Good luck & have fun to all gamblers :D.

### Set up
```
npm install
```

### Run
* Config your address and nodes in `.env`
* Generate Ethereum Accounts (if needed)
```
node gen.js <number_of_accounts>
>>> E.g node gen.js 1
```
* Run bot
```
node roll_under.js <number_of_bets> <bet_number>
>>> E.g node roll_under.js 100 48
```
