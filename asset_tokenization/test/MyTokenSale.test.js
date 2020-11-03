require('dotenv').config({ path: '../.env' });

const Token = artifacts.require('MyToken');
const TokenSale = artifacts.require('MyTokenSale');

const chai = require('./setupchai');

const BN = web3.utils.BN;
const expect = chai.expect;

const { INITIAL_TOKENS } = process.env;

contract('TokenSale Test', async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  it('should not have any tokens in my deployerAccount', async () => {
    const instance = await Token.deployed();

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
  });
});
