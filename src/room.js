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
	constructor(roomcode) {
		this.monsters = [];
		this.things = [];
	}
	
	render(ctx) {
		
	}
}