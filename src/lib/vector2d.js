/*
Simple 2D JavaScript Vector Class
Hacked from evanw's lightgl.js
https://github.com/evanw/lightgl.js/blob/master/src/vector.js*/

export default class Vector {
	constructor(x,y){
		this.x = x || 0;
		this.y = y || 0;
	}

	negative () {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	add (v) {
		if (v instanceof Vector) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}
		return this;
	}

	subtract (v) {
		if (v instanceof Vector) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}
		return this;
	}

	multiply (v) {
		if (v instanceof Vector) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}
		return this;
	}

	divide (v) {
		if (v instanceof Vector) {
			if(v.x != 0) this.x /= v.x;
			if(v.y != 0) this.y /= v.y;
		} else {
			if(v != 0) {
				this.x /= v;
				this.y /= v;
			}
		}
		return this;
	}

	equals (v) {
		return this.x == v.x && this.y == v.y;
	}

	dot (v) {
		return this.x * v.x + this.y * v.y;
	}

	cross (v) {
		return this.x * v.y - this.y * v.x
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	normalize() {
		return this.divide(this.length());
	}

	min() {
		return Math.min(this.x, this.y);
	}

	max() {
		return Math.max(this.x, this.y);
	}

	toAngles() {
		return -Math.atan2(-this.y, this.x);
	}

	angleTo(a) {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
	}

	toArray(n) {
		return [this.x, this.y].slice(0, n || 2);
	}

	clone() {
		return new Vector(this.x, this.y);
	}

	set(x, y) {
		this.x = x; this.y = y;
		return this;
	}

	static negative(v){
		return new Vector(-v.x, -v.y);
	}
	
	static add (a, b) {
		if (b instanceof Vector) return new Vector(a.x + b.x, a.y + b.y);
	};
	
	static subtract (a, b) {
		if (b instanceof Vector) return new Vector(a.x - b.x, a.y - b.y);
	};
	
	static multiply (a, b) {
		if (b instanceof Vector) return new Vector(a.x * b.x, a.y * b.y);
		else return new Vector(a.x * b, a.y * b);
	};
	
	static divide (a, b) {
		if (b instanceof Vector) return new Vector(a.x / b.x, a.y / b.y);
	};
	
	static equals (a, b) {
		return a.x == b.x && a.y == b.y;
	};
	
	static dot (a, b) {
		return a.x * b.x + a.y * b.y;
	};
	
	static cross (a, b) {
		return a.x * b.y - a.y * b.x;
};


};

