
class Game {
  constructor() {
    this.frames = [];
    this.currentFrame = 1;
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
        frame: this.currentFrame,
        roll1: pins,
        roll2: 0,
        bonus: 0,
      }
      this.newframe = false;
      this.frames.push(newframe);
    }
    else {
      this.frames[this.currentFrame].roll2 = pins;
      this.newframe = true;
    }

  }
}

module.exports = Game;