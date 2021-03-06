
class Game {
  constructor() {
    this.frames = [];
    this.index = 0;
    this.newframe = true;
    this.bonus = '';
    this.gameover = false;
    this.error = '';
    this.endbonus = 0;
  }

  listFrames() {
    return [...this.frames];
  }

  score() {
    let totalscore = 0;
    if (!this.gameover) {
      throw new Error('Game is not finished yet!  Finish the game to get the final score');
    }
    else {
      for(let i = 0; i < 10; i++) {
        totalscore += this.frames[i].roll1;
        totalscore += this.frames[i].roll2;
        totalscore += this.frames[i].bonus;
      }
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
      if (!Number.isInteger(x)) throw new Error("not an integer, need a roll of 0 to 10 pins");
      x = Number(x);
      if(x < 0) throw new Error("is too low, need a roll of 0 to 10 pins");
      if(x > 10) throw new Error("is too high, need a roll of 0 to 10 pins");
      if(!this.newframe && (this.frames[this.index].roll1 + x > 10))
        throw new Error("too many pins for this frame, not to exceed 10");
      if(this.gameover === true) throw new Error("game is over, see your score");
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
      //deal with last frame, max 2 bonus balls
      if (this.index > 9) {
        console.log('index is ' + this.index);
        console.log('gameover is ' + this.gameover);
        console.log('endbonus is ' + this.endbonus);
        console.log('bonus is ' + this.bonus);
        if ((this.bonus === '') || ((this.frames[9].roll2 !== 0)&&(this.endbonus !==0))) {
          this.gameover = true;
        }
        if (this.endbonus === 2) {
          this.gameover = true;
        }
        //cleanup extra frames
        if (this.gameover === true) {
          while (this.frames.length > 10) {
            this.frames.pop();
          }
        }
        this.endbonus++;
      }
      
    }
  }
}

module.exports = Game;