import tilesetPath from './tileset.png';

let tileset = new Image();
tileset.src = tilesetPath;

let Constants = {
    tileSize: 16,
    tileset: tileset,   

    
    shapeNames: ['down','round','EWtunnel','NStunnel','square','cross','crossround','ring','tunnel'],
    
    shapes: {
        'down': [
            '                ',
            '     ##^^##     ',
            '   ##......##   ',
            '  #..........#  ',
            ' #............# ',
            ' #...######...# ',
            '#....#    #....#',
            '<....#    #....>',
            '<....#    #....>',
            '#....#^^^^#....#',
            ' #............# ',
            ' #............# ',
            '  #..........#  ',
            '   ##......##   ',
            '     ##vv##     ',
			'                ',
        ],
        'round': [
            '                ',
            '     ##^^##     ',
            '   ##......##   ',
            '  #..........#  ',
            ' #............# ',
            ' #............# ',
            '#..............#',
            '<..............>',
            '<..............>',
            '#..............#',
            ' #............# ',
            ' #............# ',
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
            '################',
            '<..............>',
            '<..............>',
            '<..............>',
            '<..............>',
            '################',
            '                ',
            '                ',
            '                ',
            '                ',
            '                ',
        ],
        'NStunnel': [
            '                ',
            '    ###^^###    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
            '    #......#    ',
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
            '#....#....#....#',
            '#..............#',
            '<..............>',
            '<..............>',
            '#..............#',
            '#....#....#....#',
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
            '   ####..####   ',
            '   #........#   ',
            '####........####',
            '<..............>',
            '<..............>',
            '####........####',
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
            '   #........#   ',
            '  #..........#  ',
            '###..........###',
            '<..............>',
            '<..............>',
            '###..........###',
            '  #..........#  ',
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
            '#..............#',
            '#..............#',
            '#....######....#',
            '#....#    #....#',
            '<....#    #....>',
            '<....#    #....>',
            '#....#    #....#',
            '#....######....#',
            '#..............#',
            '#..............#',
            '#..............#',
            '#..............#',
            '#######vv#######',
        ],
        'tunnel': [
            '                ',
            '#######^^#######',
            '#    #.........#',
            '#    #.........#',
            '#    #.........#',
            '############...#',
            '#..............#',
            '<..............>',
            '<..............>',
            '#..............#',
            '#...############',
            '#.........#    #',
            '#.........#    #',
            '#.........#    #',
            '#.........#    #',
            '#######vv#######',
        ],
    }
};

export default Constants;