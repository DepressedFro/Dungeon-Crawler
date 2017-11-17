export default class Riddle {
	constructor(riddles, index) {
    this.locx;
    this.locy;
    this.damage = 5;

    this.riddle = riddles[index];
    this.correct = riddles[index+1];
    this.cA;
    this.cB;
    this.cC;

    this.randomChoice(index);
	}
  getPosition() {
    return {x: this.locx, y: this.locy};
  }
  randomChoice(index) {
    //Random number between 1-3
    var rand = Math.floor((Math.random()*(4-1))+1);

    //Set's random options
    switch(rand) {
      case 1:
        this.cA = riddles[index+3];
        this.cB = riddles[index+1];
        this.cC = riddles[index+2];
        break;
      case 2:
        this.cA = riddles[index+2];
        this.cB = riddles[index+1];
        this.cC = riddles[index+3];
        break;
      case 3:
        this.cA = riddles[index+1];
        this.cB = riddles[index+3];
        this.cC = riddles[index+2];
        break;
    }
  }
  update(guess) {
    if(guess === this.correct) {
      //allow them to pass.
			return 0;
    }
    else {
      //damage them and allow to pass.
      return this.damage;
    }
  }
	render(ctx) {
    //Display riddle, choices A-C.
	}
}
