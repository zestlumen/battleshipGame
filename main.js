const gameBoard = document.querySelector('.gameBoard');
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
gameBoard.appendChild(table);


const view = {
    displayMessage: function (msg) {
        const gameAlert = document.querySelector('.gameAlert');
        gameAlert.innerHTML = msg;
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


const model = {
    boardSize: 7,
    shipCnt: 3,
    shipLocaCnt: 3,
    sunkShip: 0,
    ships: [
        { locations: ['', '', ''], hits: ['', '', ''] },
        { locations: ['', '', ''], hits: ['', '', ''] },
        { locations: ['', '', ''], hits: ['', '', ''] }
    ],
    fire: function (guessLoca) {
        for (let i = 0; i < this.shipCnt; i++) {
            const ship = this.ships[i];
            const index = ship.locations.indexOf(guessLoca);
            if (index >= 0) {
                this.ship.hits[index] = "hit";
                view.displayMessage(`${guessLoca}에 명중하였습니다💥`);
                if (this.isSunk(ship)) {
                    view.displayMessage("승리🤩모든 전함 격침 완료!🔥");
                    this.sunkShip++;
                }
                view.displayMessage(`${guessLoca}은 없네요..공격실패☠`);
                return true;
            }
        }
        return false;
    },
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLocaCnt; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
}



