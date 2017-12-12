import tilesetPath from './tileset.png';
import fountainTilesetPath from './fountain.png';

let tileset = new Image();
tileset.src = tilesetPath;

let fountainTileset = new Image();
fountainTileset.src = fountainTilesetPath;

let Constants = {
    tileSize: 16,
    tileset: tileset,
    fountainTileset: fountainTileset,

    shapeNames: ['down','round','EWtunnel','NStunnel','square','cross','crossround','ring','rooms1','maze1','ring2'],

    shapes: {
        'down': [
            '                ',
            '     ##^^##     ',
            '   ##......##   ',
            '  F..........#  ',
            ' #..@......@..# ',
            ' #...######...# ',
            '#....#****#....#',
            '<....#****#....>',
            '<....#....#....>',
            '#....#....#....#',
            ' #............# ',
            ' #..@.....@...# ',
            '  #..........#  ',
            '   ##......##   ',
            '     ##vv##     ',
			'                ',
        ],
        'round': [
            '                ',
            '     ##^^##     ',
            '   ##......##   ',
            '  #..........F  ',
            ' #..@.....@...# ',
            ' #............# ',
            '#..............#',
            '<.......$......>',
            '<..............>',
            '#..............#',
            ' #............# ',
            ' #..@..x...@..# ',
            '  #..........#  ',
            '   ##......##   ',
            '     ##vv##     ',
			'                ',
        ],
        'EWtunnel': [
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
            '####F###########',
            '#..............#',
            '<.....@........>',
            '<......x.@.....>',
            '#..............#',
            '################',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
        ],
        'NStunnel': [
            '                ',
            '    ###^^#F#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #..@...#    ',
            '    #......#    ',
            '    #x.....#    ',
            '    #......#    ',
            '    #....@.#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    ###vv###    ',
            '                ',
        ],
        'square': [
            '                ',
            '#######^^#######',
            '#..............#',
            '#..............#',
            '#..............#',
            '#....F.@..#....#',
            '#..............#',
            '<...@..$..@....>',
            '<..............>',
            '#......x.......#',
            '#....#.@..#....#',
            '#..............#',
            '#..............#',
            '#..............#',
			'#..............#',
            '#######vv#######',
        ],
        'cross': [
            '                ',
            '      #^^#      ',
            '      #..#      ',
            '      #..#      ',
            '   #F##..####   ',
            '   #........#   ',
            '####..@..@..####',
            '<......$.......>',
            '<.....@..@.....>',
            '####...x....####',
            '   #........#   ',
            '   ####..####   ',
            '      #..#      ',
            '      #..#      ',
            '      #vv#      ',
            '                ',
        ],
        'crossround': [
            '                ',
            '      #^^#      ',
            '      #..#      ',
            '    ###..###    ',
            '   F........#   ',
            '  #..@....@..#  ',
            '###..........###',
            '<......$.......>',
            '<......x.......>',
            '###..........###',
            '  #..@....@..#  ',
            '   #........#   ',
            '    ###..###    ',
            '      #..#      ',
            '      #vv#      ',
            '                ',
        ],
        'ring': [
            '                ',
            '#######^^#######',
            '#..............#',
            '#..@...x.......#',
            '#..............#',
            '#....######....#',
            '#....#    #....#',
            '<....#    #....>',
            '<....#    #....>',
            '#....#    #....#',
            '#....##F###....#',
            '#..............#',
            '#..............#',
            '#...........@..#',
            '#..............#',
            '#######vv#######',
        ],
        'rooms1': [
            '                ',
            '#######^^#######',
            '#..............#',
            '#...@......@...#',
            '#..............#',
            '#..............#',
            '#######..#######',
            '<..............>',
            '<..............>',
            '###F###..#######',
            '#..............#',
            '#..............#',
            '#...$..x...@...#',
            '#..............#',
            '#..............#',
            '#######vv#######',
        ],
        'maze1': [
            '                ',
            '#######^^#######',
            '#....#.........#',
            '#..@.#.........#',
            '#....#.........#',
            '#....#.........#',
            '###..######..###',
            '<....#.........>',
            '<....#.........>',
            '#....#.........#',
            '#..####..##F####',
            '#..............#',
            '#...#..........#',
            '#.@.#..x...@...#',
            '#...#..........#',
            '#######vv#######',
        ],
        'ring2': [
            '                ',
            '#######^^#######',
            '#..............#',
            '#..............#',
            '#..............#',
            '#...###..###...#',
            '#...#......#...#',
            '<.....@..@.....>',
            '<......$.......>',
            '#...#.@..@.#...#',
            '#...#......#...#',
            '#...###..#F#...#',
            '#..............#',
            '#......x.......#',
            '#..............#',
            '#######vv#######',
        ],
    }
};

export default Constants;
