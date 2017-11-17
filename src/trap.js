export default class Trap {
	constructor(type) {
      this.type;
      this.height;
      this.width;
      this.locx;
      this.locy;
      this.damage;
			this.cd;

      //Generate a trap based on type.
			//Assign (Puzzle/Riddle Index) to 300s.
			//Flame = 301, Spike = 302, Blade = 303;
      switch(type) {
        case 301:
          this.flame();
          break;
        case 302:
          this.spike();
          break;
        case 303:
          this.blade();
          break;
      }
	}
  getPosition() {
    return {x: this.locx, y: this.locy, height: this.height, width: this.width};
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
		if(cd !== 0) cd--;
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
