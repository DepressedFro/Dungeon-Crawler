export default class Trap {
	constructor(index) {
      this.index = index;
			this.type;
      this.height;
      this.width;
      this.locx;
      this.locy;
      this.damage;
			this.cd;

      this.determineTrap();
	}
  getPosition() {
    return {x: this.locx, y: this.locy, height: this.height, width: this.width};
  }
	determineTrap() {
		//Generate a trap based on type.
		//Assign (Puzzle/Riddle Index) to 200s.
		//Flame = 201, Spike = 202, Blade = 203;
		switch(this.index) {
			case 201:
				this.flame();
				break;
			case 202:
				this.spike();
				break;
			case 203:
				this.blade();
				break;
		}
	}
  flame() {
    this.height = 1;
    this.width = 4;
    this.damage = 10;
		this.type = 'flame';
  }
  spike() {
    this.height = 1;
    this.width = 1;
    this.damage = 2;
		this.type = 'spike';
  }
  blade() {
    this.height = 3;
    this.width = 3;
    this.damage = 5;
		this.type = 'blade';
  }
  update() {
    //Deal damage, and any other interactions.
		if(this.cd !== 0) this.cd--;
		else {
			this.cd = 5;
			return this.damage;
		}


  }
	render(ctx) {
    //Render trap based on type.
    switch(this.type) {
      case 'flame':
        break;
      case 'spike':
        break;
      case 'blade':
        break;
    }
	}
}
