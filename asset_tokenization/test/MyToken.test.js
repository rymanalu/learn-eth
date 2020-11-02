const Token = artifacts.require('MyToken');

const { assert } = require('chai');
const chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('Token Test', async (accounts) => {
  it('all tokens should be in my account', async () => {
    const instance = await Token.deployed();
    const totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
  });
});
