require('dotenv').config({ path: '../.env' });

const Token = artifacts.require('MyToken');

const chai = require('./setupchai');

const BN = web3.utils.BN;
const expect = chai.expect;

const { INITIAL_TOKENS } = process.env;

contract('Token Test', async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  let myToken;

  beforeEach(async () => {
    myToken = await Token.new(INITIAL_TOKENS);
  });

  it('all tokens should be in my account', async () => {
    const instance = myToken;
    const totalSupply = await instance.totalSupply();

    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('is possible to send tokens between accounts', async () => {
    const sendTokens = 1;
    const instance = myToken;
    const totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.a.fulfilled;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it('is not possible to send more tokens than available in total', async () => {
    const instance = myToken;
    const balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.a.rejected;
    return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });
});
