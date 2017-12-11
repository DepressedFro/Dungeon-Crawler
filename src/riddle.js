import * as Papa from "papaparse";
import seedrandom from 'seedrandom';
import Riddles from './riddles.csv';

export default class Riddle {
	constructor(index) {
		this.index = index;
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
		if(this.index === 0) this.clear();
		else {
		//Timeout provides time for this.riddles to be filled.
		setTimeout(() => {
			this.randomChoice(this.index);
			this.render();
    }, 500);
	}
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
  update(pressed) {
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
	}
}
