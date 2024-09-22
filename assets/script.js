var grid = document.getElementById('gameGrid')

const getRandom = () => {
    return Math.floor(Math.random() * 12);
}

var centerCell = 'cell-' + getRandom() + getRandom();

for (var i = 0; i < 12; i++) {
    var row = grid.insertRow();
    row.setAttribute('id', `row-${i}`);
    for (var j = 0; j < 12; j++) {
        var cell = row.insertCell();
        cell.setAttribute('id', `cell-${i}${j}`);
        cell.classList = 'px-3';
        if (cell.id === centerCell) {
            var cellText = document.createTextNode('G');
        } else {
            var cellText = document.createTextNode('x');
        }
        cell.append(cellText);
    };
};

var initialCell = document.getElementById('cell-00');
initialCell.innerHTML = 'O';

const rBtn = document.getElementById('r-btn');

$('#r-btn').on('click', function() {
    console.log('Hi')
})

var loc = '00';
