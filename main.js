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
        td.addEventListener('click', (e) => {
            const guess = e.target.id;
            controller.progressClickGuess(guess);
        });
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
        // cell.setAttribute('class', 'miss');
        cell.classList.add('miss');
    },
    displayHit: function (parseloca) {
        const cell = document.getElementById(parseloca);
        // cell.setAttribute('class', 'hit');
        cell.classList.add('hit');
    },
    displayResult: function (result) {
        const gameResult = document.querySelector('.gameResult');
        gameResult.innerHTML = result;
        gameResult.classList.add('visible');
        gameResult.addEventListener('click', () => {
            gameResult.classList.remove('visible');
            const cells = document.querySelectorAll('.hit, .miss');
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove('hit') || cells[i].classList.remove('miss');
            };
            controller.replayGame();
        });
    }

}

const model = {
    ships: [
        { locations: ['0', '0', '0'], hits: ['', '', ''] },
        { locations: ['0', '0', '0'], hits: ['', '', ''] },
        { locations: ['0', '0', '0'], hits: ['', '', ''] },
    ],
    boardSize: 7,
    shipsCnt: 3,
    shipLocaCnt: 3,
    sunkShip: 0,

    generateShip: function () {
        const direction = Math.floor(Math.random() * 2);
        let row = 0, col = 0;
        const newShipLocations = [];

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLocaCnt + 1));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLocaCnt + 1));
            col = Math.floor(Math.random() * this.boardSize);
        }
        for (let i = 0; i < this.shipLocaCnt; i++) {
            if (direction === 1) {
                newShipLocations.push(`${row}${col + i}`);
            } else {
                newShipLocations.push(`${row + i}${col}`);
            }
        }
        return newShipLocations;
    },
    collision: function (newShipLocations) {
        for (let i = 0; i < this.shipsCnt; i++) {
            const ship = model.ships[i];
            for (let j = 0; j < this.shipLocaCnt; j++) {
                if (ship.locations.indexOf(newShipLocations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    generateShipLocations: function () {
        let newShipLocations = [];
        for (let i = 0; i < this.shipsCnt; i++) {
            do {
                newShipLocations = this.generateShip();
            } while (this.collision(newShipLocations));

            this.ships[i].locations = newShipLocations;
        }
    },

    fire: function (parseloca) {
        for (let i = 0; i < this.shipsCnt; i++) {
            const ship = this.ships[i];
            const index = ship.locations.indexOf(parseloca);

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
    progressClickGuess: function (guess) {
        if (guess) {
            this.guessCnt++;
            const sunk = model.fire(guess);
            if (sunk && model.sunkShip === model.shipsCnt) {
                view.displayResult(`🚩승리! ${this.guessCnt}번 만에 모든 전함 격침 완료!!!`);
            };
        }
    },
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
    },
    replayGame: function () {
        this.guessCnt = 0;
        model.sunkShip = 0;
        model.ships = [
            { locations: ['0', '0', '0'], hits: ['', '', ''] },
            { locations: ['0', '0', '0'], hits: ['', '', ''] },
            { locations: ['0', '0', '0'], hits: ['', '', ''] },
        ];
        model.generateShipLocations();
        handleFire();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    model.generateShipLocations();
    handleFire();
})

function handleFire() {
    const fireForm = document.querySelector('.gameForm');
    const fireBtn = document.querySelector('.fireBtn');
    const fireInput = document.querySelector('.fireInput');
    fireBtn.addEventListener('click', () => {
        const fireValue = fireInput.value;
        controller.progressGuess(fireValue);
        fireInput.value = '';
    });
    fireForm.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            fireBtn.click();
        }
    })
}
