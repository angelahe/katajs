const Game = require('../bowling/index');
const assert = require('assert').strict;

describe("integration test", function() {
  it("should be able to add a roll to a frame", function() {
    let game = new Game();
    assert.strictEqual(game.listFrames().length, 0);

    game.roll(2);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 2, roll2: 0, bonus: 0 }]
    );
  });
});