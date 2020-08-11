const Game = require('../bowling/index');
const { globalAgent } = require('http');
const assert = require('assert').strict;

describe("bowling: roll(pins)", function() {
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

describe("bowling: roll(pins)", function() {
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

describe("bowling: roll(pins)", function() {
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

describe("bowling: roll(pins)", function() {
  it("should be able to detect a strike and record bonus points", function() {
    let game = new Game();
    game.roll(10);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 10, roll2: 0, bonus: 0 }]
    );
    assert.strictEqual(game.bonus, 'strike'); 
    assert.strictEqual(game.newframe, true);
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

describe("bowling: roll(pins)", function() {
  it("should be able to calculate bonus after 3 strikes in a row", function() {
    let game = new Game();
    game.roll(10);
    assert.strictEqual(game.listFrames().length, 1);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 10, roll2: 0, bonus: 0 }]
    );
    assert.strictEqual(game.bonus, 'strike');
    assert.strictEqual(game.newframe, true); 
    game.roll(10);
    assert.deepStrictEqual(game.listFrames(), 
      [{ frame: 1, roll1: 10, roll2: 0, bonus: 10 },
       { frame: 2, roll1: 10, roll2: 0, bonus: 0 }]
    ); 
    assert.strictEqual(game.index, 2);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, 'strike');
    game.roll(10);
    assert.deepStrictEqual(game.listFrames(), 
     [{ frame: 1, roll1: 10, roll2: 0, bonus: 20 },
      { frame: 2, roll1: 10, roll2: 0, bonus: 10 },
      { frame: 3, roll1: 10, roll2: 0, bonus: 0 }]
    );  
    assert.strictEqual(game.index, 3);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, 'strike');  
    game.roll(8);
    assert.deepStrictEqual(game.listFrames(), 
     [{ frame: 1, roll1: 10, roll2: 0, bonus: 20 },
      { frame: 2, roll1: 10, roll2: 0, bonus: 20 },
      { frame: 3, roll1: 10, roll2: 0, bonus: 8 },
      { frame: 4, roll1: 8, roll2: 0, bonus: 0 }]
    );   
    assert.strictEqual(game.index, 3);
    assert.strictEqual(game.newframe, false);
    assert.strictEqual(game.bonus, 'strike');
    game.roll(1);
    assert.deepStrictEqual(game.listFrames(), 
     [{ frame: 1, roll1: 10, roll2: 0, bonus: 20 },
      { frame: 2, roll1: 10, roll2: 0, bonus: 20 },
      { frame: 3, roll1: 10, roll2: 0, bonus: 9 },
      { frame: 4, roll1: 8, roll2: 1, bonus: 0 }]
    );   
    assert.strictEqual(game.index, 4);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, '');   

  });
});

describe("bowling: roll(pins)", function() {
  it.skip("should handle a strike in the last frame and allow 2 bonus balls", function() {
    
  });
});

describe("bowling: roll(pins)", function() {
  it("should handle a spare in the last frame and allow 1 bonus ball", function() {
    
  });
});

describe("bowling: checkroll(pins)", function() {
  it("should be able to throw error on non-number, non-integer pins argument", function() {
    let game = new Game(); 
    const expectedErrorA = "not a number, need a roll of 0 to 10 pins";
    const expectedErrorB = "not an integer, need a roll of 0 to 10 pins";

    /* if I just do throw this works but now I put the error message in the object 

    assert.throws(() => {
      game.checkroll('a');
    }, expectedErrorA);

    assert.throws(() => {
      game.checkroll('NaN');
    }, expectedErrorA);
    this.error = expectedErrorA;

    assert.throws(() => {
      game.checkroll(NaN);
    }, expectedErrorA);
    
    assert.throws(() => {
      game.checkroll('');
    }, expectedErrorB);
*/

    game.checkroll();
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll('a');
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll('NaN');
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll(NaN);
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll('');
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll(1.47);
    assert.strictEqual(game.error, expectedErrorB);
    assert.strictEqual(game.frames.length, 0);
    assert.strictEqual(game.index, 0);
    assert.strictEqual(game.newframe, true);
    assert.strictEqual(game.bonus, '');
    assert.strictEqual(game.bonus, '');
    assert.strictEqual(game.gameover, false);
    game.roll(3);
    assert.strictEqual(game.error, '');
  });
});

describe("bowling: roll()", function() {
  it.skip("should be able to throw error if game is over", function() {
    
  });
});


describe("bowling: roll(pins)", function() {
  it("should be able to throw error if pins is not 0 to 10", function() {
    let game = new Game();  
    const expectedErrorA = "is too low, need a roll of 0 to 10 pins";
    const expectedErrorB = "is too high, need a roll of 0 to 10 pins";

    game.checkroll(-1);
    assert.strictEqual(game.error, expectedErrorA);
    game.checkroll(11);
    assert.strictEqual(game.error, expectedErrorB);

  });
});


describe("bowling: roll(pins)", function() {
  it("should be able to throw error if 2nd roll would exceed 10 pins", function() {
    let game = new Game();
    const expectedError = "too many pins for this frame, not to exceed 10";

    game.roll(6);
    game.roll(5);
    assert.strictEqual(game.error, expectedError);
  });
});

describe("bowling: score()", function() {
  it.skip("should be able to return the final score", function() {
    
  });
});

describe("bowling: score()", function() {
  it("should be able to throw an error if the game isn't done and score is called", function() {
    let game = new Game(); 
    const expectedError = new Error("Game is not finished yet!  Finish the game to get the final score");

    assert.throws(() => {
      game.score();
    }, expectedError);
  });
});

