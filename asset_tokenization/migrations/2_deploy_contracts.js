require('dotenv').config({ path: '../.env' });

const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const KYC = artifacts.require("KYC");

const { INITIAL_TOKENS } = process.env;

module.exports = async (deployer) => {
  const addresses = await web3.eth.getAccounts();

  await deployer.deploy(MyToken, INITIAL_TOKENS);
  await deployer.deploy(KYC);
  await deployer.deploy(MyTokenSale, 1, addresses[0], MyToken.address, KYC.address);

  const instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, INITIAL_TOKENS);
};
