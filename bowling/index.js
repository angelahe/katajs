
class Game {
  constructor() {
    this.frames = [];
    this.index = 0;
    this.newframe = true;
    this.bonus = '';
  }

  listFrames() {
    return [...this.frames];
  }

  score() {
    let totalscore = 0;
    // do a map to total frames[].roll1 + frames[].roll2 + frames[].bonus
    return totalscore;
  }

  roll(pins) {
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
          if (this.frames[this.index-2].pins == 10) {
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