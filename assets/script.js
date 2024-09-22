var grid = document.getElementById('gameGrid')
var currentLoc = '0.0';
var locRow = 0;
var locCell = 0;

const getRandom = () => {
    return Math.floor(Math.random() * 12);
};

const updateBtns = () => {
    var buttons = document.querySelectorAll('.directionBtn');
    buttons.forEach(function (button) {
        button.disabled = false;
    });

    if (locRow === 0) {
        document.getElementById('u-btn').disabled = true;
        document.getElementById('ur-btn').disabled = true;
        document.getElementById('ul-btn').disabled = true;
    };

    if (locRow === 11) {
        document.getElementById('d-btn').disabled = true;
        document.getElementById('dr-btn').disabled = true;
        document.getElementById('dl-btn').disabled = true;
    };

    if (locCell === 0) {
        document.getElementById('l-btn').disabled = true;
        document.getElementById('dl-btn').disabled = true;
        document.getElementById('ul-btn').disabled = true;
    };

    if (locCell === 11) {
        document.getElementById('r-btn').disabled = true;
        document.getElementById('dr-btn').disabled = true;
        document.getElementById('ur-btn').disabled = true;
    };
};

const updateLoc = () => {
    resetOldLoc();
    currentLoc = locRow.toString() + '.' + locCell.toString();
    revealNewLoc();
    updateBtns();
};

const revealNewLoc = () => {
    var revealedCell = document.getElementById(`cell-${currentLoc}`);
    console.log(revealedCell)
    revealedCell.innerHTML = 'O';
    revealedCell.classList = 'px-3 bg-success';
    if (revealedCell.id === groundCell) {
        alert('You Won! Congrats!')
    }
};

const resetOldLoc = () => {
    var oldCell = document.getElementById(`cell-${currentLoc}`);
    oldCell.classList.remove('bg-success')
};

var groundCell = 'cell-' + getRandom() + '.' + getRandom();

const createGrid = () => {
    for (var i = 0; i < 12; i++) {
        var row = grid.insertRow();
        row.setAttribute('id', `row-${i}`);
        for (var j = 0; j < 12; j++) {
            var cell = row.insertCell();
            cell.setAttribute('id', `cell-${i}.${j}`);
            cell.classList = 'px-3';
            
                var cellText = document.createTextNode('x');
            
            cell.append(cellText);
        };
        var initialCell = document.getElementById('cell-0.0');
        initialCell.innerHTML = 'O';
    };
};

$('#u-btn').on('click', function () {
    locRow -= 1;
    updateLoc();
});

$('#d-btn').on('click', function () {
    locRow += 1;
    updateLoc();
});

$('#r-btn').on('click', function () {
    locCell += 1;
    updateLoc();
});

$('#l-btn').on('click', function () {
    locCell -= 1;
    updateLoc();
});

$('#ur-btn').on('click', function () {
    locRow -= 1;
    locCell += 1;
    updateLoc();
});

$('#ul-btn').on('click', function () {
    locRow -= 1;
    locCell -= 1;
    updateLoc();
});

$('#dr-btn').on('click', function () {
    locRow += 1;
    locCell += 1;
    updateLoc();
});

$('#dl-btn').on('click', function () {
    locRow += 1;
    locCell -= 1;
    updateLoc();
});

createGrid();
updateBtns();
