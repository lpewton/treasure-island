var grid = document.getElementById('gameGrid')
var currentLoc = '0.0';
var locRow = 0;
var locCell = 0;
var score = 0;
var level = 1;
var difficulty = 3;
var limit = level * 6;
var cellVals = {};

// Functions
const getRandom = v => {
    return Math.floor(Math.random() * v);
};

const createGroundCell = () => {
    do {
        groundCell = 'cell-' + getRandom(difficulty) + '.' + getRandom(difficulty);
    } while (groundCell === 'cell-0.0')
    return groundCell;
};

const createGrid = () => {
    grid.innerHTML = '';
    var groundCell = createGroundCell();
    var groundRow = parseInt(groundCell[5]);
    var groundCol = parseInt(groundCell[7]);
    var tbody = document.createElement('tbody');
    currentLoc = '0.0';
    locRow = 0;
    locCell = 0;
    tbody.classList = 'p-3';
    grid.appendChild(tbody);
    for (var i = 0; i < difficulty; i++) {
        var row = grid.insertRow();
        row.setAttribute('id', `row-${i}`);
        for (var j = 0; j < difficulty; j++) {
            var rowText = Math.abs(i - groundRow);
            var colText = Math.abs(j - groundCol);
            var textSum = rowText + colText;
            var text = getRandom(textSum) + 1;
            var cell = row.insertCell();
            cell.setAttribute('id', `cell-${i}.${j}`);
            cellVals[cell.id] = text;
            cell.classList = 'px-2 rounded-circle';
            // if (cell.id === groundCell) {
            //     var cellText = document.createTextNode('G');
            // } else {
                var cellText = document.createTextNode('X');
            // }
            cell.append(cellText);
        };
    };

    revealNewLoc();
    var tbody = document.getElementsByTagName('tbody');
    tbody.classList = 'p-3';
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
    document.getElementById('main-div').classList = 'd-none';
    document.getElementById('levelpassed').classList = 'bg-dark d-block vh-100 d-flex justify-content-center align-items-center';

    setTimeout(() => {
        document.getElementById('main-div').classList = 'container';
        document.getElementById('levelpassed').classList = 'd-none';
    }, 1500);
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
    revealedCell.classList = 'px-1 bg-success rounded-circle';

    if (document.getElementById(`cell-${locRow}.${locCell + 1}`)) {
        rCellText = `cell-${locRow}.${locCell + 1}`;
        var rCell = document.getElementById(rCellText);
        rCell.innerHTML = cellVals[rCellText];
    };
    if (document.getElementById(`cell-${locRow}.${locCell - 1}`)) {
        lCellText = `cell-${locRow}.${locCell - 1}`;
        var lCell = document.getElementById(lCellText);
        lCell.innerHTML = cellVals[lCellText];
    };
    if (document.getElementById(`cell-${locRow + 1}.${locCell}`)) {
        uCellText = `cell-${locRow + 1}.${locCell}`;
        var uCell = document.getElementById(uCellText);
        uCell.innerHTML = cellVals[uCellText];
    };
    if (document.getElementById(`cell-${locRow - 1}.${locCell}`)) {
        dCellText = `cell-${locRow - 1}.${locCell}`;
        var dCell = document.getElementById(dCellText);
        dCell.innerHTML = cellVals[dCellText];
    };

    if (document.getElementById(`cell-${locRow - 1}.${locCell - 1}`)) {
        ulCellText = `cell-${locRow - 1}.${locCell - 1}`;
        var ulCell = document.getElementById(ulCellText);
        ulCell.innerHTML = cellVals[ulCellText];
    };
    if (document.getElementById(`cell-${locRow - 1}.${locCell + 1}`)) {
        urCellText = `cell-${locRow - 1}.${locCell + 1}`;
        var urCell = document.getElementById(urCellText);
        urCell.innerHTML = cellVals[urCellText];
    };
    if (document.getElementById(`cell-${locRow + 1}.${locCell - 1}`)) {
        dlCellText = `cell-${locRow - 1 * -1}.${locCell - 1}`;
        var dlCell = document.getElementById(dlCellText);
        dlCell.innerHTML = cellVals[dlCellText];
    };
    if (document.getElementById(`cell-${locRow + 1}.${locCell + 1}`)) {
        drCellText = `cell-${locRow - 1 * -1}.${locCell + 1}`;
        var drCell = document.getElementById(drCellText);
        drCell.innerHTML = cellVals[drCellText];
    };

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

// Directions and Buttons
// document.addEventListener('keydown', function(event) {
//     switch (event.key) {
//         case 'ArrowUp':
//             locRow -= 1;
//             break;
//         case 'ArrowDown':
//             locRow += 1;
//             break;
//         case 'ArrowRight':
//             locCell += 1;
//             break;
//         case 'ArrowLeft':
//             locCell -= 1;
//             break;
//     }
//     updateLoc();
//     })

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
