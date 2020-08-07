
class Game {
  constructor() {
    this.frames = [];
    this.index = 0;
    this.newframe = true;
    this.bonus = '';
    this.gameover = false;
  }

  listFrames() {
    return [...this.frames];
  }

  score() {
    let totalscore = 0;
    if (this.index != 10) {
      throw new Error('Game is not finished yet!  Finish the game to get the final score');
    }

    // do a map to total frames[].roll1 + frames[].roll2 + frames[].bonus
    return totalscore;
  }

  catchrollerrors(pins) {
    x = pins;
    try {
      if (x == '') throw "need a number for your roll of 0 to 10 pins";
      if (isNaN(x)) throw "not a number, need a roll of 0 to 10 pins";
      x = Number(x);
      if(x < 0) throw "roll is too low, need a roll of 0 to 10 pins";
      if(x > 10) throw "roll is too high, need a roll of 0 to 10 pins";
    }
    catch(err) {
      console.log("Input is " + err);
      x = -1;
    }

    return(x);
  }

  roll(pins) {
    numpins = 
    if (this.newframe == true) {
      let newframe = {
        frame: this.index+1,
        roll1: pins,
        roll2: 0,
        bonus: 0,
      }
      //deal with spare bonus
      if (this.bonus == 'spare') {
        this.frames[this.index-1].bonus = pins;
        this.bonus = '';
      }
      // deal with case of 2 strikes in a row bonus
      if (this.bonus == 'strike') {
        this.frames[this.index-1].bonus = pins;
        // deal with case of 3 strikes in a row bonus
        if (this.index > 1) {
          if (this.frames[this.index-2].roll1 == 10) {
            this.frames[this.index-2].bonus+=10;
          }
        }
      }
      
      if (pins == 10) {
        this.bonus = 'strike';
        this.index++;
      }
      else {
        this.newframe = false;
      }
      this.frames.push(newframe);
      
    }
    else {
      this.frames[this.index].roll2 = pins;
      //deal with 2nd ball bonus after strike
      if (this.bonus == 'strike') {
        this.frames[this.index-1].bonus+=pins;
        this.bonus = '';
      }
      this.newframe = true;
      if (this.frames[this.index].roll1 + this.frames[this.index].roll2 == 10)
        this.bonus = 'spare';
      this.index++;
      
    }

  }
}

module.exports = Game;