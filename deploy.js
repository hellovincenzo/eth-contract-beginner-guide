require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compile = require('./compile');

  const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_API_KEY);

  const web3 = new Web3(provider);

  const deploy = async () => {
  
    // Get a list of all accounts
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ' + accounts[0]);

      // Use one of those accounts to deploy
      const result = await new web3.eth.Contract(compile.Inbox.abi)
      .deploy({ data: compile.Inbox.evm.bytecode.object, arguments: ['Hi there!'] })
      .send({ from: accounts[0], gas: '1000000'})

    console.log(`Contract deployed to ${result.options.address}`);
  }

deploy();
