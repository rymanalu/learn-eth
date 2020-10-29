const ItemManager = artifacts.require('./ItemManager.sol');

contract('ItemManager', accounts => {
  it('...should be able to add a new item', async () => {
    const instance = await ItemManager.deployed();

    const itemName = 'item1';
    const itemPrice = 500;

    const result = await instance.createItem(itemName, itemPrice, { from: accounts[0] });
    const itemIndex = result.logs[0].args._itemIndex;

    assert.equal(itemIndex, 0);

    const item = await instance.items(itemIndex);

    assert.equal(item._identifier, itemName);
  });
});
