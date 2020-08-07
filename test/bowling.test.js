const Game = require('../bowling/index');
const { globalAgent } = require('http');
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
    assert.strictEqual(game.index, 1);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, ''); 
  });
});

describe("bowling: roll()", function() {
  it("should be able to detect a spare and record bonus points", function() {
    let game = new Game();
    game.roll(2);
    game.roll(8);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 2, roll2: 8, bonus: 0 }]
    );
    assert.strictEqual(game.bonus, 'spare'); 
    game.roll(6);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 2, roll2: 8, bonus: 6 },
       { frame: 2, roll1: 6, roll2: 0, bonus: 0 }]
    ); 
    assert.strictEqual(game.index, 1);
    assert.strictEqual(game.newframe, false);
    assert.strictEqual(game.bonus, ''); 
  });
});

describe("bowling: roll()", function() {
  it("should be able to detect a strike and record bonus points", function() {
    let game = new Game();
    game.roll(10);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 10, roll2: 0, bonus: 0 }]
    );
    assert.strictEqual(game.bonus, 'strike'); 
    game.roll(6);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 10, roll2: 0, bonus: 6 },
       { frame: 2, roll1: 6, roll2: 0, bonus: 0 }]
    ); 
    assert.strictEqual(game.index, 1);
    assert.strictEqual(game.newframe, false);
    assert.strictEqual(game.bonus, 'strike');
    game.roll(3);
    assert.deepStrictEqual(game.listFrames(), 
     [{ frame: 1, roll1: 10, roll2: 0, bonus: 9 },
      { frame: 2, roll1: 6, roll2: 3, bonus: 0 }]
    );  
    assert.strictEqual(game.index, 2);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, '');  
  });
});

describe("bowling: roll()", function() {
  it.skip("should be able to calculate bonus after 3 strikes in a row", function() {
    
  });
});

describe("bowling: roll()", function() {
  it.skip("should handle a strike in the last frame and allow 2 bonus balls", function() {
    
  });
});

describe("bowling: roll()", function() {
  it.skip("should handle a spare in the last frame and allow 1 bonus ball", function() {
    
  });
});

describe("bowling: roll()", function() {
  it.skip("should be able to throw error on non-number pins argument", function() {
    
  });
});

describe("bowling: roll()", function() {
  it.skip("should be able to throw error if game is over", function() {
    
  });
});


describe("bowling: roll()", function() {
  it.skip("should be able to throw error if pins is more than 10", function() {

  });
});


describe("bowling: roll()", function() {
  it.skip("should be able to throw error if pins is a negative or floating point", function() {

  });
});

describe("bowling: roll()", function() {
  it.skip("should be able to throw error if 2nd roll would exceed 10 pins", function() {

  });
});

describe("bowling: score()", function() {
  it.skip("should be able to return the final score", function() {
    
  });
});

describe("bowling: score()", function() {
  it.skip("should be able to throw an error if the game isn't done and score is called", function() {

  });
});

