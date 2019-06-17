let Web3 = require('web3');
require('dotenv').load();

let web3_mainnet = new Web3(new Web3.providers.HttpProvider(process.env.mainnet));
let web3_rinkerby = new Web3(new Web3.providers.HttpProvider(process.env.rinkeby));

let web3 = process.env.environment === 'mainnet' ? web3_mainnet : web3_rinkerby;

function generateNewAccount(numberWallet) {
  for (let i = 0; i < numberWallet; i++) {
    let {address, privateKey} = web3.eth.accounts.create();
    console.log("---\nAddress =", address, "\nPrivate Key =", privateKey)
  }
}

if (process.argv[1].includes('gen.js')) {
  // node gen.js <num_wallets>
  generateNewAccount(process.argv[2])
}
