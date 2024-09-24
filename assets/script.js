var grid = document.getElementById('gameGrid')
var currentLoc = '0.0';
var locRow = 0;
var locCell = 0;
var score = 0;
var level = 1;
var difficulty = level * 3;
var limit = level * 6;

const getRandom = () => {
    return Math.floor(Math.random() * difficulty);
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

    if (locRow === (difficulty - 1)) {
        document.getElementById('d-btn').disabled = true;
        document.getElementById('dr-btn').disabled = true;
        document.getElementById('dl-btn').disabled = true;
    };

    if (locCell === 0) {
        document.getElementById('l-btn').disabled = true;
        document.getElementById('dl-btn').disabled = true;
        document.getElementById('ul-btn').disabled = true;
    };

    if (locCell === (difficulty - 1)) {
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
    revealedCell.innerHTML = 'O';
    revealedCell.classList = 'px-2 bg-success';
    score += 1;
    document.getElementById('score').innerHTML = score;
    if (revealedCell.id === groundCell) {
        level += 1;
        difficulty = level * 4;
        document.getElementById('gameGrid').innerHTML = '';
        document.getElementById('successBtn').click();
            createGrid();
    };
};

const resetOldLoc = () => {
    var oldCell = document.getElementById(`cell-${currentLoc}`);
    oldCell.classList.remove('bg-success')
};

const createGroundCell = () => {
    groundCell = 'cell-' + getRandom() + '.' + getRandom();
    if (groundCell === 'cell-0.0') {
        return createGroundCell();
    } else {
    return groundCell;
    }
}

const createGrid = () => {
    var groundCell = createGroundCell();
    for (var i = 0; i < difficulty; i++) {
        var row = grid.insertRow();
        row.setAttribute('id', `row-${i}`);
        for (var j = 0; j < difficulty; j++) {
            var cell = row.insertCell();
            cell.setAttribute('id', `cell-${i}.${j}`);
            cell.classList = 'px-2';
            if (cell.id === groundCell) {
                var cellText = document.createTextNode('G');
                console.log(cell.id)
            } else {
                var cellText = document.createTextNode('X');
            }
            cell.append(cellText);
        };
        var initialCell = document.getElementById('cell-0.0');
        initialCell.innerHTML = 'O';
    };
    document.getElementById('limit').innerHTML = limit;
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
