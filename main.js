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
        // td.innerText = `${i}${j}`;
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
    displayMiss: function (parseloca) {
        const cell = document.getElementById(parseloca);
        cell.setAttribute('class', 'miss');
    },
    displayHit: function (parseloca) {
        const cell = document.getElementById(parseloca);
        cell.setAttribute('class', 'hit');
    },
    displayResult: function (result) {
        const gameResult = document.querySelector('.gameResult');
        gameResult.innerHTML = result;
        gameResult.classList.add('visible');
    }
}


const model = {
    boardSize: 7,
    shipsCnt: 3,
    shipLocaCnt: 3,
    sunkShip: 0,
    ships: [
        { locations: ['10', '11', '12'], hits: ['', '', ''] },
        { locations: ['06', '16', '26'], hits: ['', '', ''] },
        { locations: ['24', '34', '44'], hits: ['', '', ''] }
    ],
    fire: function (parseloca) {
        for (let i = 0; i < this.shipsCnt; i++) {
            const ship = this.ships[i];
            const index = ship.locations.indexOf(parseloca);
            debugger;
            if (index >= 0) {
                view.displayHit(parseloca);
                view.displayMessage('명중하였습니다💥');
                ship.hits[index] = "hit";
                if (this.isSunk(ship)) {
                    view.displayMessage("대단해! 전함을 부셔버렸어🔥");
                    this.sunkShip++;
                }
                return true;
            }
        }
        view.displayMessage(`여기엔 없네요..공격실패☠`);
        view.displayMiss(parseloca);
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


var controller = {
    guessCnt: 0,
    progressGuess: function (guess) {
        const parseloca = this.parseGuess(guess);
        if (parseloca) {
            this.guessCnt++;
            const sunk = model.fire(parseloca);
            if (sunk && model.sunkShip === model.shipsCnt) {
                view.displayResult(`🚩승리! ${this.guessCnt}번 만에 모든 전함 격침 완료!!!`);
            };
        }
    },
    parseGuess: function (guess) {
        const locaStr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        if (Number(guess) || guess === null || guess.length !== 2) {
            view.displayMessage('입력오류😵 ex) A4, b3처럼 입력해주세요.');
        } else {
            const firstChar = guess.charAt(0) === guess.charAt(0).toUpperCase() ?
                guess.charAt(0) : guess.charAt(0).toUpperCase();
            const firstNum = locaStr.indexOf(firstChar);
            const secondNum = guess.charAt(1);
            if (isNaN(firstNum) || isNaN(secondNum)) {
                view.displayMessage('입력오류😵 위치값이 올바르지 않음');
            } else if (firstNum === -1 || secondNum < 0 || secondNum >= model.boardSize) {
                view.displayMessage('앗😲 범위를 벗어났어요!');
            } else {
                return firstNum + secondNum;
            }
        }
        return null;
    }
}




