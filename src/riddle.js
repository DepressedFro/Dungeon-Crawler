import * as Papa from "papaparse";
import Riddles from './riddles.csv';

export default class Riddle {
	constructor() {
		this.index;
    this.damage = 5;
		this.riddles;
		this.question;
		this.correct;
    this.cA;
    this.cB;
    this.cC;

		//bind functions for easy passing
		this.grabRiddles = this.grabRiddles.bind(this);
		this.setRiddles = this.setRiddles.bind(this);
    this.grabRiddles(this.setRiddles);

		//Timeout provides time for this.riddles to be filled.
		setTimeout(() => {
			//Temporary random number until roomcode works.
			this.randomChoice(Math.floor((Math.random()*(this.riddles.length-2))+1));
			this.render();
    }, 100)
	}
  getChoices() {
    return {a: this.cA, b: this.cB, c: this.cC};
  }
//reads in the data and then calls a setter function
	grabRiddles(callBack)
	{
		//use library to grab riddles
		Papa.parse(Riddles,
		{
	    download: true,
	    delimiter: ',',
			header: true,
			dynamicTyping: true,
	    complete: function(results)
			{
	        callBack(results.data);
	    }
		});
	}

//sets the riddles array to be equal the read in data
	setRiddles(results)
	{
		this.riddles = results;
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
  update(guess) {
		this.clear();
    if(guess === this.correct) {
      //allow them to pass.
			return 0;
    }
    else {
      //damage them and allow to pass.
      return this.damage;
    }
  }
	render() {

		var temp = ['textbox', 'cA', 'cB', 'cC'];
		var count = 0;
		var content = [this.question, "1. " + this.cA, "2. " + this.cB, "3. " + this.cC];

		//Loop to add in text.
		temp.forEach(function(i){
		  var temp2 = document.getElementById(i);
		  temp2.textContent = content[count];
			count++;
		});

		// ctx.save();
    // ctx.fillStyle = 'white';
		// ctx.font = "10px Arial";
    // ctx.fillText(this.question, 18, 190);
		// ctx.fillText("A: " + this.cA, 18, 205);
		// ctx.fillText("B: " + this.cB, 18, 220)
		// ctx.fillText("C: " + this.cC, 18, 235)
    // ctx.restore();
	}
}
