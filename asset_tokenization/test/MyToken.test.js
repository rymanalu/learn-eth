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
  const [deployerAccount, recipient, anotherAccount] = accounts;

  let myToken;

  beforeEach(async () => {
    myToken = await Token.new(1000000);
  });

  it('all tokens should be in my account', async () => {
    const instance = myToken;
    const totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('is possible to send tokens between accounts', async () => {
    const sendTokens = 1;
    const instance = myToken;
    const totalSupply = await instance.totalSupply();

    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.a.fulfilled;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it('is not possible to send more tokens than available in total', async () => {
    const instance = myToken;
    const balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.a.rejected;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });
});
