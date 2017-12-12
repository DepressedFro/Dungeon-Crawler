export default class Riddle {
	constructor(game, index, riddles) {
		this.game = game;
		this.index = index;
    this.damage = 5;
		this.riddles = riddles;
		this.show = false;
		this.question;
		this.correct;
    this.cA;
    this.cB;
    this.cC;


		if(this.index === 0) this.clear();
		else {
			this.clear();
		//Timeout provides time for this.riddles to be filled.
		setTimeout(() => {
			this.randomChoice(this.index);
			this.render();
    }, 10);
	}
	}
  getChoices() {
    return {a: this.cA, b: this.cB, c: this.cC};
  }
  randomChoice(index) {
    //Random number between 1-3
    var rand = Math.floor((Math.random()*(4-1))+1);
		this.question = this.riddles[index]["Question"];
		this.correct = this.riddles[index]["Correct Answer"];
    //Set's random options
    switch(rand) {
      case 1:
        this.cA = this.riddles[index]["Fake Answer #2"];
        this.cB = this.riddles[index]["Correct Answer"];
        this.cC = this.riddles[index]["Fake Answer #1"];
        break;
      case 2:
        this.cA = this.riddles[index]["Fake Answer #1"];
        this.cB = this.riddles[index]["Correct Answer"];
        this.cC = this.riddles[index]["Fake Answer #2"];
        break;
      case 3:
        this.cA = this.riddles[index]["Correct Answer"];
        this.cB = this.riddles[index]["Fake Answer #2"];
        this.cC = this.riddles[index]["Fake Answer #1"];
        break;
    }
  }
	clear() {
		//Removes text
		var temp = ['textbox', 'cA', 'cB', 'cC'];
		temp.forEach(function(i){
		  var temp2 = document.getElementById(i);
		  temp2.textContent = "";
		});
	}
  update(pressed) {
		if (!this.show)
			return;

		var choices = this.getChoices();
		var guess
		if(pressed['1']){
			guess = choices.a;
		} else if (pressed['2']) {
			guess = choices.b;
		} else if (pressed['3']) {
			guess = choices.c;
		} else {
			return null;
		}

		this.clear();
    if(guess === this.correct) {
      //allow them to pass.
			return 0;
    }
    else {
			//damage them and allow to pass.
			this.game.shake(10);
      return this.damage;
    }
  }
	render() {
		if (!this.show)
			return;

		var temp = ['textbox', 'cA', 'cB', 'cC'];
		var count = 0;
		var content = [this.question, "1. " + this.cA, "2. " + this.cB, "3. " + this.cC];

		//Loop to add in text.
		temp.forEach(function(i){
		  var temp2 = document.getElementById(i);
		  temp2.textContent = content[count];
			count++;
		});
	}
}
