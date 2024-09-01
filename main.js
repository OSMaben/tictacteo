


let currentPlayer = '';
let TicTacTeoSize = 20;
let grid = [];
let winnerResult = 5;



// store data in localhost  

function savePlayersInLocalHost()
{
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;

    localStorage.setItem('player 1',player1);
    localStorage.setItem('player 2', player2);

    console.log(player2);
    console.log(player1);

    setTimeout(() => {
        window.location.href="http://127.0.0.1:5500/tic_tac_teo.html";
    }, 1000);

}

// print player in the page of the game
function printPlayers(){
    let player1 = document.querySelector('.PlayerOne');
    let player2 = document.querySelector('.PlayerTwo');
 
    player1.innerText = localStorage.getItem('player 1');
    player2.innerText = localStorage.getItem('player 2');
}
 
printPlayers();

// learn about  how to play  the  game
function  learn()
{
    window.location.href="https://www.exploratorium.edu/explore/puzzles/tictactoe";
}


// exit playing  the game
// function exit(){
//     localStorage.clear();
//     window.location.href= "/";
// }



function startGame() {
    const player1 = localStorage.getItem('player 1');
    const player2 = localStorage.getItem('player 2');

    currentPlayer = Math.random() < 0.5 ? player1 : player2;

    document.getElementById('turnIndicator').innerText = `${currentPlayer}'s turn`;

    createGrid();

    for (let i = 0; i < TicTacTeoSize; i++) {
        grid[i] = Array(TicTacTeoSize).fill(null);
    }
}

window.onload = startGame;

function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.style.display = 'grid';
    gridElement.style.gridTemplateColumns = `repeat(${TicTacTeoSize}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${TicTacTeoSize}, 1fr)`;

    for (let i = 0; i < TicTacTeoSize * TicTacTeoSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleMove);
        gridElement.appendChild(cell);
    }
}

function handleMove(e) {
    let ScorePlayer1 = parseInt(localStorage.getItem('scorePlayer1')) || 0;
    let ScorePlayer2 = parseInt(localStorage.getItem('scorePlayer2')) || 0;

    const index = Array.from(e.target.parentNode.children).indexOf(e.target);
    console.log("index is "+ index);
    const x = index % TicTacTeoSize;// ky3tina x pos
    const y = Math.floor(index / TicTacTeoSize); // ky3tina y
    console.log('x == '+ x );
    console.log('y == '+ y );
    console.log(grid);
    if (!grid[y][x]) { // Only allow move if the cell is empty
        grid[y][x] = currentPlayer;// kn7at smiya dyl player
        e.target.innerText = currentPlayer === localStorage.getItem('player 1') ? 'X' : 'O';// knjib smiya dyl player 1 li f localstorage oknchof wax nobto ila ah kn3tih x

        if (checkWin(x, y)) {
            alert(`${currentPlayer} wins!`);
           if (currentPlayer == localStorage.getItem('player 1')) {
            ScorePlayer1 += 1;
            localStorage.setItem('scorePlayer1', ScorePlayer1); 
            document.querySelector('.PlayerOneScore').innerText = ScorePlayer1;
            console.log("Score of player 1 is: " + localStorage.getItem('scorePlayer1'));
        } else {
            // Increment player 2's score
            ScorePlayer2 += 1;
            localStorage.setItem('scorePlayer2', ScorePlayer2); 
            document.querySelector('.PlayerTwoScore').innerText = localStorage.getItem('scorePlayer2');
            console.log("Score of player 2 is: " + localStorage.getItem('scorePlayer2'));
        }
            
            resetGame();
        } else {
            // Switch players
            currentPlayer = currentPlayer === localStorage.getItem('player 1') ? localStorage.getItem('player 2') : localStorage.getItem('player 1');
            document.getElementById('turnIndicator').innerText = `${currentPlayer}'s turn`;
        }
    }
}
function checkWin(x, y) {
    return checkRow(y) || checkColumn(x) || checkMainDiagonal() || checkAntiDiagonal();
}

function checkRow(row) {
    let count = 0;
    for (let col = 0; col < TicTacTeoSize; col++) {
        if (grid[row][col] === currentPlayer) {
            count++;
            if (count === winnerResult) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkColumn(col) {
    let count = 0;
    for (let row = 0; row < TicTacTeoSize; row++) {
        if (grid[row][col] === currentPlayer) {
            count++;
            if (count === winnerResult) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkMainDiagonal() {
    let count = 0;
    for (let i = 0; i < TicTacTeoSize; i++) {
        if (grid[i][i] === currentPlayer) {
            count++;
            if (count === winnerResult) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkAntiDiagonal() {
    let count = 0;
    for (let i = 0; i < TicTacTeoSize; i++) {
        if (grid[i][TicTacTeoSize - 1 - i] === currentPlayer) {
            count++;
            if (count === winnerResult) return true;
        } else {
            count = 0;
        }
    }
    return false;
}


function resetGame() {
    // Clear the grid and reset the game
    document.getElementById('grid').innerHTML = '';
    grid = [];
    startGame();
}


