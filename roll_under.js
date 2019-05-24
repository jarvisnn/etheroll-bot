require('dotenv').config();
let Web3 = require('web3');
let web3_mainnet = new Web3(new Web3.providers.WebsocketProvider(process.env.mainnet_wss));
let web3_rinkerby = new Web3(new Web3.providers.WebsocketProvider(process.env.mainnet_wss));
let Tx = require('ethereumjs-tx');
const fs = require('fs');

let web3 = process.env.environment === 'mainnet'? web3_mainnet : web3_rinkeby;

const CONTRACT_ABI = [{"constant":false,"inputs":[{"name":"newCallbackGasPrice","type":"uint256"}],"name":"ownerSetCallbackGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalWeiWon","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxProfitAsPercentOfHouse","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newHouseEdge","type":"uint256"}],"name":"ownerSetHouseEdge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"payoutsPaused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newTreasury","type":"address"}],"name":"ownerSetTreasury","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"},{"name":"proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addressToCheck","type":"address"}],"name":"playerGetPendingTxByAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newContractBalanceInWei","type":"uint256"}],"name":"ownerUpdateContractBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxProfitDivisor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newPayoutStatus","type":"bool"}],"name":"ownerPausePayouts","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"ownerChangeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newMaxProfitAsPercent","type":"uint256"}],"name":"ownerSetMaxProfitAsPercentOfHouse","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"treasury","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWeiWagered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newMinimumBet","type":"uint256"}],"name":"ownerSetMinBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newStatus","type":"bool"}],"name":"ownerPauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gasForOraclize","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sendTo","type":"address"},{"name":"amount","type":"uint256"}],"name":"ownerTransferEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"playerWithdrawPendingTransactions","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxProfit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"randomQueryID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gamePaused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"originalPlayerBetId","type":"bytes32"},{"name":"sendTo","type":"address"},{"name":"originalPlayerProfit","type":"uint256"},{"name":"originalPlayerBetValue","type":"uint256"}],"name":"ownerRefundPlayer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newSafeGasToOraclize","type":"uint32"}],"name":"ownerSetOraclizeSafeGas","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"ownerkill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"houseEdge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"rollUnder","type":"uint256"}],"name":"playerRollDice","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"houseEdgeDivisor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxPendingPayouts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"BetID","type":"bytes32"},{"indexed":true,"name":"PlayerAddress","type":"address"},{"indexed":true,"name":"RewardValue","type":"uint256"},{"indexed":false,"name":"ProfitValue","type":"uint256"},{"indexed":false,"name":"BetValue","type":"uint256"},{"indexed":false,"name":"PlayerNumber","type":"uint256"},{"indexed":false,"name":"RandomQueryID","type":"uint256"}],"name":"LogBet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ResultSerialNumber","type":"uint256"},{"indexed":true,"name":"BetID","type":"bytes32"},{"indexed":true,"name":"PlayerAddress","type":"address"},{"indexed":false,"name":"PlayerNumber","type":"uint256"},{"indexed":false,"name":"DiceResult","type":"uint256"},{"indexed":false,"name":"Value","type":"uint256"},{"indexed":false,"name":"Status","type":"int256"},{"indexed":false,"name":"Proof","type":"bytes"}],"name":"LogResult","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"BetID","type":"bytes32"},{"indexed":true,"name":"PlayerAddress","type":"address"},{"indexed":true,"name":"RefundValue","type":"uint256"}],"name":"LogRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"SentToAddress","type":"address"},{"indexed":true,"name":"AmountTransferred","type":"uint256"}],"name":"LogOwnerTransfer","type":"event"}]
const CONTRACT_ADDRESS = "0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d";

let TxnHashToBetId = {}

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(sleepTime, fn, ...args) {
  await timeout(sleepTime);
  return fn && fn(...args);
}

async function betUnder(betValue, betNumber=48) {
  console.log(`Submitting Bet: (number, value) =`, betNumber, betValue);

  let address = process.env.account;
  let privateKey = process.env.private_key.replace('0x', '');
  let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  try {
    let currentGasPrice = parseInt(await web3.eth.getGasPrice());
    let signedTransaction = await web3.eth.accounts.signTransaction({
      nonce: await web3.eth.getTransactionCount(address),
      to: CONTRACT_ADDRESS,
      gas: 200000,
      gasPrice: `${Math.min(currentGasPrice + 1500000000, 10000000000)}`,
      value: `${web3.utils.toWei(`${betValue}`, 'ether')}`,
      data: `0xdc6dd1520000000000000000000000000000000000000000000000000000000000000030`,   // Num = 48
    }, privateKey);

    let pKey = new Buffer(privateKey, 'hex');
    let tx = new Tx(signedTransaction.rawTransaction);
    tx.sign(pKey);
    let serializedTx = tx.serialize();

    return await new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (error, data) => {
        if (error) {
          console.error('Submit Bet Failed', error);
          process.exit();
        }
        else {
          console.error('Bet Submitted: (number, value, txn_hash) =', betNumber, betValue, data);
          resolve(data);
        }
      });
    })
  }
  catch(err) {
    console.error(`UNEXPECTED ERROR`, err)
    process.exit();
  }
}

async function getBetId(txnHash) {
  return await new Promise((resolve, reject) => {
    let intervalId = setInterval(() => {
      if (TxnHashToBetId[txnHash]) {
        clearInterval(intervalId);
        resolve(TxnHashToBetId[txnHash]);
      }
    }, 2000)
  });
}

async function getBetResult(betID) {
  let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  return await new Promise((resolve, reject) => {

    let intervalId = setInterval(() => {

      contract.getPastEvents('LogResult', {
        filter: {
          BetID: betID
        },
        fromBlock: 0,
      }, (error, event) => {
        if (event && event[0]) {
          clearInterval(intervalId);
          resolve({
            "bet_value": parseInt(event[0]['returnValues']["BetValue"]),
            "dice_result": parseInt(event[0]['returnValues']['DiceResult']),
            "status": parseInt(event[0]['returnValues']['Status']),
          })
        }
      })

    }, 3000)
  });
}

let BET_AMOUNT = [0, 0.2, 0.25, 0.42, 0.8, 1.52];

async function startBetting(numBet=100) {
  let lossIndex = 0;

  for (let i = 1; i <= numBet; i += 1) {
      if (lossIndex == BET_AMOUNT.length) lossIndex = 0;
      let betTxnHash = await betUnder(BET_AMOUNT[lossIndex+1]);
      let betId = await getBetId(betTxnHash);
      let {bet_value, dice_result, status} = await getBetResult(betId);

      /* Status: 0=lose, 1=win, 2=win + failed send, 3=refund, 4=refund + failed send*/
    	var result = status == 0 ? "LOSE" : "WIN";
      console.log("------", result, " dice_result =", dice_result)
      if (result == "LOSE") {
        lossIndex += 1
      }
      else if (result == "WIN") {
        lossIndex = 0
      }
  }
}

async function startListening() {
  let startingBlockNum = 0;

  let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  function run() {
    // console.log("Starting New Fetch, starting_block_num =", startingBlockNum)

    contract.getPastEvents('LogBet', {
      filter: {
        PlayerAddress: process.env.account,
      },
      fromBlock: startingBlockNum,
    }, (error, bids) => {
      if (error) {
        console.log('--- Fetching Bet Order Error:', error)
      }
      else {
        bids.forEach((bid) => {
          if (!TxnHashToBetId[bid.transactionHash]) {
            TxnHashToBetId[bid.transactionHash] = bid.returnValues.BetID;
            // console.log("--- New Bet Found")
            // console.log("       txn_hash = ", bid.transactionHash)
            // console.log("       bet id = ", bid.returnValues.BetID)
            // console.log("       bet number = ", parseInt(bid.returnValues.PlayerNumber))
            // console.log("       bet amount = ", parseInt(bid.returnValues.BetValue))
            startingBlockNum = Math.max(startingBlockNum, parseInt(bid.blockNumber));
          }
        });
      }
    })
  }

  run();
  setInterval(run, 20000);
}

if (process.argv[1].includes('roll_under.js')) {
  // node roll_under.js
  startListening()
  startBetting()
}
