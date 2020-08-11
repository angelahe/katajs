
class Game {
  constructor() {
    this.frames = [];
    this.index = 0;
    this.newframe = true;
    this.bonus = '';
    this.gameover = false;
    this.error = '';
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

  checkroll(pins) {
    let x = pins;
    //reset error
    this.error = '';
    try { 
      if (x === '') throw new Error("not a number, need a roll of 0 to 10 pins");
      if (Number.isNaN(x) && (Number(x) !== 0)) throw new Error("not a number, need a roll of 0 to 10 pins");
       
     // if (Number.isNaN(x) && (Number(x) != 0)) throw new Error("not a number, need a roll of 0 to 10 pins");
      if (!Number.isInteger(x)) throw new Error("not an integer, need a roll of 0 to 10 pins");
      x = Number(x);
      if(x < 0) throw new Error("is too low, need a roll of 0 to 10 pins");
      if(x > 10) throw new Error("is too high, need a roll of 0 to 10 pins");
      if(!this.newframe && (this.frames[this.index].roll1 + x > 10))
        throw new Error("too many pins for this frame, not to exceed 10");
      if(this.gameover) throw new Error("game is over, see your score");
    }
    catch(err) {
      console.log('pins is '+ pins );
      console.error(err.name + ': ' + err.message);
      x = -1;
      this.error = err.message;
    }
    finally {
      return(x);
    }
  }

  roll(pins) {
    let pinnum = this.checkroll(pins);
    if (pinnum !== -1 && !this.gameover) {
      if (this.newframe === true) {
        let newframe = {
          frame: this.index+1,
          roll1: pinnum,
          roll2: 0,
          bonus: 0,
        }
        //deal with spare bonus
        if (this.bonus === 'spare') {
          this.frames[this.index-1].bonus = pinnum;
          this.bonus = '';
        }
        // deal with case of 2 strikes in a row bonus
        if (this.bonus === 'strike') {
          this.frames[this.index-1].bonus = pinnum;
          // deal with case of 3 strikes in a row bonus
          if (this.index > 1) {
            if (this.frames[this.index-2].roll1 == 10) {
              this.frames[this.index-2].bonus+=10;
            }
          }
        }
        if (pinnum === 10) {
          this.bonus = 'strike';
          this.index++;
        }
        else {
          this.newframe = false;
        }
        this.frames.push(newframe);
      }
      else {
        this.frames[this.index].roll2 = pinnum;
        //deal with 2nd ball bonus after strike
        if (this.bonus === 'strike') {
          this.frames[this.index-1].bonus+=pinnum;
          this.bonus = '';
        }
        this.newframe = true;
        if (this.frames[this.index].roll1 + this.frames[this.index].roll2 == 10)
          this.bonus = 'spare';
        this.index++;
      }
      //check if gameover
      if (this.index > 10 && this.bonus === '')
        this.gameover;
      
    }
  }
}

module.exports = Game;