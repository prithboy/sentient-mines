const grid = document.getElementById('grid');
const messageEl = document.getElementById('message');
const scoreEl = document.getElementById('score');
const bestScoreEl = document.getElementById('best-score');
const replayBtn = document.getElementById('replayBtn');

let score = 0;
let bestScore = 0;
let gameOver = false;

const gridSize = 5;
const totalTiles = gridSize * gridSize;
const mineCount = 5; // Number of mines
let minePositions = [];

function createGrid() {
    grid.innerHTML = '';
    minePositions = [];

    // Generate unique mine positions
    while (minePositions.length < mineCount) {
        let pos = Math.floor(Math.random() * totalTiles);
        if (!minePositions.includes(pos)) minePositions.push(pos);
    }

    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = i;
        tile.addEventListener('click', revealTile);
        grid.appendChild(tile);
    }

    score = 0;
    scoreEl.textContent = score;
    messageEl.textContent = "Click a tile to start!";
    gameOver = false;
}

function revealTile() {
    if (gameOver) return;
    const index = parseInt(this.dataset.index);

    if (minePositions.includes(index)) {
        this.classList.add('mine');
        this.style.backgroundImage = "url('assets/angry_dobby.png')";
        this.style.backgroundSize = "cover";
        this.style.backgroundPosition = "center";
        messageEl.textContent = "💥 Virus detected. System compromised!";
        endGame();
    } else {
        this.classList.add('safe');
        this.style.backgroundImage = "url('assets/happy_dobby.png')";
        this.style.backgroundSize = "cover";
        this.style.backgroundPosition = "center";
        score++;
        scoreEl.textContent = score;
        messageEl.textContent = "✅ Safe! Neural core intact.";
    }
}

function endGame() {
    gameOver = true;
    bestScore = Math.max(bestScore, score);
    bestScoreEl.textContent = bestScore;

    // Reveal all mines
    document.querySelectorAll('.tile').forEach((tile, i) => {
        if (minePositions.includes(i) && !tile.style.backgroundImage) {
            tile.style.backgroundImage = "url('assets/angry_dobby.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundPosition = "center";
        }
    });
}

replayBtn.addEventListener('click', createGrid);

// Initialize
createGrid();
