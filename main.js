const game_board = document.querySelector('.game_board');
const tableRow = 7;
const tableData = 7;
const table = document.createElement('table');
table.setAttribute('class', 'table');

for (let i = 0; i < tableRow; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < tableData; j++) {
        const td = document.createElement('td');
        td.setAttribute('class', 'td');
        td.setAttribute('id', `${i}${j}`);
        td.innerText = `${i}${j}`;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
game_board.appendChild(table);


const view = {
    displayMessage: function (msg) {
        const game_alert = document.querySelector('.game_alert');
        game_alert.innerHTML = msg;
    },
    displayMiss: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },
    displayHit: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    }
}


