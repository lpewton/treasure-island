var grid = document.getElementById('gameGrid')
var currentLoc = '0.0';
var locRow = 0;
var locCell = 0;
var score = 0;
var level = 1;
var difficulty = 3;
var limit = level * 6;

// Functions
const getRandom = () => {
    return Math.floor(Math.random() * difficulty);
};

const createGroundCell = () => {
    do {
        groundCell = 'cell-' + getRandom() + '.' + getRandom();
    } while (groundCell === 'cell-0.0')
    return groundCell;
};

const createGrid = () => {
    grid.innerHTML = '';
    var groundCell = createGroundCell();
    for (var i = 0; i < difficulty; i++) {
        var row = grid.insertRow();
        row.setAttribute('id', `row-${i}`);
        for (var j = 0; j < difficulty; j++) {
            var cell = row.insertCell();
            cell.setAttribute('id', `cell-${i}.${j}`);
            cell.classList = 'px-2 rounded-circle';
            if (cell.id === groundCell) {
                var cellText = document.createTextNode('G');
            } else {
                var cellText = document.createTextNode('X');
            }
            cell.append(cellText);
        };
    };
    var initialCell = document.getElementById('cell-0.0');
    initialCell.innerHTML = '<i class="fa-solid fa-sailboat"></i>';
    initialCell.classList = 'bg-success text-center rounded-circle';
    currentLoc = '0.0';
    locRow = 0;
    locCell = 0;
    document.getElementById('level').innerHTML = level;
    document.getElementById('limit').innerHTML = limit;
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

const resetOldLoc = () => {
    var oldCell = document.getElementById(`cell-${currentLoc}`);
    oldCell.innerHTML = 'O';
    oldCell.classList.remove('bg-success')
};

const levelCleared = () => {
    level += 1;
    limit += 3;
    score = 0;
    document.getElementById('score').innerHTML = score;
    difficulty = level + 2;
    revealedCell = document.getElementById(`cell-${currentLoc}`);
    createGrid();
};

const restartGame = () => {
    score = 0;
    level = 1;
    difficulty = 3;
    limit = level * 6;
    createGrid();
    updateBtns();
    document.getElementById('defeatBtn').click();
}

const revealNewLoc = () => {
    var revealedCell = document.getElementById(`cell-${currentLoc}`);
    revealedCell.innerHTML = '<i class="fa-solid fa-sailboat"></i>';
    revealedCell.classList = 'px-2 bg-success rounded-circle';
    if (score === (limit - 1)) {
        restartGame();
    } else {
        score += 1;
    }
    document.getElementById('score').innerHTML = score;
    if (revealedCell.id === groundCell) {
        levelCleared();
    };
};

const updateLoc = () => {
    resetOldLoc();
    currentLoc = locRow.toString() + '.' + locCell.toString();
    revealNewLoc();
    updateBtns();
};

// Buttons
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

// Initialise
createGrid();
updateBtns();
