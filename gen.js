let Web3 = require('web3');
require('dotenv').load();

let web3_mainnet = new Web3(new Web3.providers.HttpProvider(process.env.mainnet));
let web3_rinkerby = new Web3(new Web3.providers.HttpProvider(process.env.rinkeby));
const fs = require('fs');

let web3 = process.env.environment === 'mainnet' ? web3_mainnet : web3_rinkerby;

function generateNewAccount(fileName, numberWallet) {
  let walletName = `accounts/${fileName}.txt`;
  let walletFile = fs.createWriteStream(walletName, {
    flags: 'a'
  });
  let rs = {};
  for (let i = 0; i < numberWallet; i++) {
    let {address, privateKey} = web3.eth.accounts.create();
    rs[address] = privateKey;
  }
  walletFile.write(JSON.stringify(rs));
}

if (process.argv[1].includes('gen.js')) {
  // node gen.js <filename> <num_wallets>
  generateNewAccount(process.argv[2], process.argv[3])
}
