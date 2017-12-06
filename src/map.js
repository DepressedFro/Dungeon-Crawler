/* [RA, RS, ND, ED, SD, WD, E1, E2, E3, E4, K, G, T, P1, P2, P3]
 * RA:Room Art Style
 * RS:Room Shape
 * ND:North Door
 * ED:East Door
 * SD:South Door
 * WD:West Door
 * E1:Enemy Count 1
 * E2:Enemy Count 2
 * E3:Enemy Count 3
 * E4:Enemy Count 4
 * K: Key
 * G: Gold/Treasure Type
 * P1:Puzzle/Riddle Index 1
 * P2:Puzzle/Riddle Index 2
 * P3:Puzzle/Riddle Index 3
 */

export default class Map {
	constructor(size, type) {
		this.size = size;
		this.seed = Math.floor(Math.random() * 1000000);
		this.rooms = [];
		this.roomsString = [];
		this.center = Math.floor(size/2);
		this.startx = -1;
		this.starty = -1;
		this.getEmptyMap(size);
		this.makeBranch(this.center, this.center, 0, Math.floor(size/2 - 1));
		this.makeBranch(this.center, this.center, 1, Math.floor(size/2 - 1));
		this.makeBranch(this.center, this.center, 2, Math.floor(size/2 - 1));
		this.makeBranch(this.center, this.center, 3, Math.floor(size/2 - 1));
		this.finalizeRooms();
		
		this.roomsToString();
		console.log(this.seed);
		//console.log(this.roomsString);
	}
	
	getEmptyMap(size) {
		for(var y = 0; y < size; y++) {
			var roomrow = [];
			var roomrowString = [];
			for(var x = 0; x < size; x++) {
				roomrowString.push("");
				if(x === this.center && y === this.center) {
					roomrow.push(this.getRoomCode(1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0));
				}
				else {
					roomrow.push(this.getRoomCode(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
				}
			}
			this.rooms.push(roomrow);
			this.roomsString.push(roomrowString);
		}
	}
	
	makeBranch(x, y, dir, len) {
		var dy = 0;
		var dx = 0;
		switch (dir) {
			case 0:	//North
				dy = -1;
				break;
			case 1:	//East
				dx = 1;
				break;
			case 2: //South
				dy = 1;
				break;
			case 3:	//West
				dx = -1;
				break;
			default:
				break;
		}
		
		while(len > 0 && x > 0 && y > 0 && x < this.size - 1 && y < this.size - 1) {
			x += dx;
			y += dy;
			this.rooms[y][x] = this.getRoomCode(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			if(Math.random() * 100 < 35) {
				this.makeBranchingBranch(x, y, dir, len);
			}
			len--;
		}
	}
	
	makeBranchingBranch(x, y, olddir, len) {
		if(len > 0) {
			var dir = -1;
			switch (olddir) {
				case 0: //North
					if(Math.random() * 100 < 50) {
						dir = 1; //East
					}
					else {
						dir = 3; //West
					}
					break;
				case 2: //South
					if(Math.random() * 100 < 50) {
						dir = 1; //East
					}
					else {
						dir = 3; //West
					}
					break;
				case 1: //East
					if(Math.random() * 100 < 50) {
						dir = 0; //East
					}
					else {
						dir = 2; //West
					}
					break;
				case 3: //West
					if(Math.random() * 100 < 50) {
						dir = 0; //East
					}
					else {
						dir = 2; //West
					}
					break;
				default:
					break;
			}
			
			if(dir > -1) {
				this.makeBranch(x, y, dir, len);
			}
		}
	}
	
	finalizeRooms() {
		for(var y = 0; y < this.size; y++) {
			for(var x = 0; x < this.size; x++) {
				if(this.rooms[y][x][0] > 0) {
					var numdoors = 0;
					
					var ndoor = 0;
					if(y > 0 && this.rooms[y - 1][x][0] > 0) {
						ndoor = 1;
						numdoors++;
					}
					var edoor = 0;
					if(x < this.size - 1 && this.rooms[y][x + 1][0] > 0) {
						edoor = 1;
						numdoors++;
					}
					var sdoor = 0;
					if(y < this.size - 1 && this.rooms[y + 1][x][0] > 0) {
						sdoor = 1;
						numdoors++;
					}
					var wdoor = 0;
					if(x > 0 && this.rooms[y][x - 1][0] > 0) {
						wdoor = 1;
						numdoors++;
					}
					
					this.rooms[y][x][2] = ndoor;
					this.rooms[y][x][3] = edoor;
					this.rooms[y][x][4] = sdoor;
					this.rooms[y][x][5] = wdoor;
					
					if(y === this.center && x == this.center) {
						this.rooms[y][x][1] = 0;
					}
					else if(numdoors < 2) {
						this.rooms[y][x][1] = 1;
						if(this.startx < 0 || Math.random() < 0.25) {
							this.startx = x;
							this.starty = y;
						}
					}
					else if(ndoor === 0 && sdoor === 0 && edoor === 1 && wdoor === 1 && Math.random() < 0.75) {
						this.rooms[y][x][1] = 2;
					}
					else if(ndoor === 1 && sdoor === 1 && edoor === 0 && wdoor === 0 && Math.random() < 0.75) {
						this.rooms[y][x][1] = 3;
					}
					else {
						this.rooms[y][x][1] = Math.floor(Math.random() * 5) + 4;
						
						this.rooms[y][x][6] = Math.ceil(Math.random() * 4);
						this.rooms[y][x][7] = Math.ceil(Math.random() * 4);
						this.rooms[y][x][8] = Math.ceil(Math.random() * 4);
						this.rooms[y][x][9] = Math.ceil(Math.random() * 4);
					}
				}
			}
		}
	}
	
	getRoomCode(artStyle, shape, ndoor, edoor, sdoor, wdoor, enemyCount1, enemyCount2, enemyCount3, enemyCount4, key, treasure, puzzleID) {
		var roomCode = [];
		roomCode.push(artStyle);
		roomCode.push(shape);
		roomCode.push(ndoor);
		roomCode.push(edoor);
		roomCode.push(sdoor);
		roomCode.push(wdoor);
		roomCode.push(enemyCount1);
		roomCode.push(enemyCount2);
		roomCode.push(enemyCount3);
		roomCode.push(enemyCount4);
		roomCode.push(key);
		roomCode.push(treasure);
		roomCode.push(puzzleID);
		return roomCode;
	}
	
	roomsToString() {
		for(var y = 0; y < this.size; y++) {
			for(var x = 0; x < this.size; x++) {
				var roomCode = "";
				roomCode += this.rooms[y][x][0].toString();	//Art Style
				
				roomCode += this.rooms[y][x][1].toString(); //Room Shape
				roomCode += this.rooms[y][x][2].toString(); //North Door
				roomCode += this.rooms[y][x][3].toString(); //East Door
				roomCode += this.rooms[y][x][4].toString(); //West Door
				roomCode += this.rooms[y][x][5].toString(); //South Door
				/*
				roomCode += this.rooms[y][x][6].toString(); //Enemy Count 1
				roomCode += this.rooms[y][x][7].toString(); //Enemy Count 2
				roomCode += this.rooms[y][x][8].toString(); //Enemy Count 3
				roomCode += this.rooms[y][x][9].toString(); //Enemy Count 4
				roomCode += this.rooms[y][x][10].toString(); //Key ID
				roomCode += this.rooms[y][x][11].toString(); //Treasure ID
				
				var puzzleString = this.rooms[y][x][12].toString();
				if(puzzleString.length === 0)
					roomCode += "000";
				else if(puzzleString.length === 1)
					roomCode += "00";
				else if(puzzleString.length === 2)
					roomCode += "0";
				
				roomCode += puzzleString;	//Puzzle ID
				*/
				this.roomsString[y][x] = roomCode;
			}
		}
	}
}