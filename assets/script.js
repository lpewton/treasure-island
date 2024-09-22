var grid = document.getElementById('gameGrid')
var currentLoc = '0.0';
var locRow = 0;
var locCell = 0;

const getRandom = () => {
    return Math.floor(Math.random() * 12);
};

const updateLoc = () => {
    currentLoc = locRow.toString() + '.' + locCell.toString();
    revealNewLoc();
    updateBtns();
};

const revealNewLoc = () => {
    var revealedCell = document.getElementById(`cell-${currentLoc}`);
    revealedCell.innerHTML = 'O'
};

const updateBtns = () => {
    var uBtn = document.getElementById('u-btn');
    var dBtn = document.getElementById('d-btn');
    var rBtn = document.getElementById('r-btn');
    var lBtn = document.getElementById('l-btn');
    var urBtn = document.getElementById('ur-btn');
    var ulBtn = document.getElementById('ul-btn');
    var drBtn = document.getElementById('dr-btn');
    var dlBtn = document.getElementById('dl-btn');

    if (locRow < 1) {
        uBtn.disabled = true;
        urBtn.disabled = true;
        ulBtn.disabled = true;
    } else {
        uBtn.disabled = false;
        urBtn.disabled = false;
        ulBtn.disabled = false;
    }
    if (locRow > 10) {
        dBtn.disabled = true;
        drBtn.disabled = true;
        dlBtn.disabled = true;
    } else {
        dBtn.disabled = false;
        drBtn.disabled = false;
        dlBtn.disabled = false;
    }

    if (locCell < 1) {
        lBtn.disabled = true;
        ulBtn.disabled = true;
        dlBtn.disabled = true;
    } else {
        lBtn.disabled = false;
        ulBtn.disabled = false;
        dlBtn.disabled = false;
    }

    if (locCell > 10) {
        rBtn.disabled = true;
        urBtn.disabled = true;
        drBtn.disabled = true;
    } else {
        rBtn.disabled = false;
        urBtn.disabled = false;
        drBtn.disabled = false;
    }
}

updateBtns();

var centerCell = 'cell-' + getRandom() + '.' + getRandom();

for (var i = 0; i < 12; i++) {
    var row = grid.insertRow();
    row.setAttribute('id', `row-${i}`);
    for (var j = 0; j < 12; j++) {
        var cell = row.insertCell();
        cell.setAttribute('id', `cell-${i}.${j}`);
        cell.classList = 'px-3';
        if (cell.id === centerCell) {
            var cellText = document.createTextNode('G');
        } else {
            var cellText = document.createTextNode('x');
        }
        cell.append(cellText);
    };
};

var initialCell = document.getElementById('cell-0.0');
initialCell.innerHTML = 'O';

const rBtn = document.getElementById('r-btn');

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
