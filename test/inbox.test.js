const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const compile = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  inbox = await new web3.eth.Contract(compile.Inbox.abi)
  .deploy({ data: compile.Inbox.evm.bytecode.object, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000'})

  // the contract 
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('it has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('Updating the "message"').send({ from: accounts[0]} );
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Updating the "message"')
  });
});