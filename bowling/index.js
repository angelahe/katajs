
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
      this.newframe = false;
      this.frames.push(newframe);
      if (this.bonus == 'spare') {
        this.frames[this.index-1].bonus = pins;
        this.bonus = '';
      }
    }
    else {
      this.frames[this.index].roll2 = pins;
      this.newframe = true;
      if (this.frames[this.index].roll1 + this.frames[this.index].roll2 == 10)
        this.bonus = 'spare';
      this.index++;
      
    }

  }
}

module.exports = Game;