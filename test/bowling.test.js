const Game = require('../bowling/index');
const assert = require('assert').strict;

describe("bowling: roll()", function() {
  it("should be able to add a roll to a frame", function() {
    let game = new Game();
    assert.strictEqual(game.listFrames().length, 0);

    game.roll(2);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 2, roll2: 0, bonus: 0 }]
    );
    assert.strictEqual(game.index, 0);
    assert.strictEqual(game.newframe, false);
    assert.strictEqual(game.bonus, '');
  });
});

describe("bowling: roll()", function() {
  it("should be able to add a second roll to a frame", function() {
    let game = new Game();
    game.roll(2);
    game.roll(3);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 2, roll2: 3, bonus: 0 }]
    );
    assert.strictEqual(game.index, 0);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, ''); 
  });
});

/*
describe("bowling: ", function() {
  it("should be able to ", function() {

  });
});
*/