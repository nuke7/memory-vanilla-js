let boardSize = 4; // Default board size
let numPairs;
let cards;
let selectedCards = [];
let matchedPairs = 0;
let gameEnd = false;

function startGame() {
  const boardSizeSelect = document.getElementById("boardSize");
  boardSize = parseInt(boardSizeSelect.value, 10);
  numPairs = (boardSize * boardSize) / 2;

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  gameEnd = false;

  generateCards();
  renderBoard();
}

function generateCards() {
  const values = generateRandomValues(numPairs);
  cards = [];
  for (let i = 0; i < numPairs * 2; i++) {
    cards.push({
      value: values[i],
      flipped: false,
    });
  }
}

function generateRandomValues(numPairs) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const pairs = [];
  const uniquePairs = new Set();

  while (uniquePairs.size < numPairs) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    if (!uniquePairs.has(randomChar)) {
      uniquePairs.add(randomChar);
      pairs.push(randomChar);
    }
  }

  const values = [...pairs, ...pairs];

  return shuffleArray(values);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < boardSize; j++) {
      const index = i * boardSize + j;
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.index = index;
      card.textContent = cards[index].flipped ? cards[index].value : "?";
      card.addEventListener("click", handleCardClick);
      row.appendChild(card);
    }
    gameBoard.appendChild(row);
  }
}

function handleCardClick(event) {
  if (gameEnd || selectedCards.length >= 2) {
    return;
  }

  const index = event.target.dataset.index;
  const card = cards[index];

  if (!card.flipped) {
    card.flipped = true;
    selectedCards.push(card);
    renderBoard();

    if (selectedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
}

function checkForMatch() {
  const [card1, card2] = selectedCards;

  if (card1.value === card2.value) {
    matchedPairs++;
    if (matchedPairs === numPairs) {
      endGame();
    }
  } else {
    card1.flipped = false;
    card2.flipped = false;
  }

  selectedCards = [];
  renderBoard();
}

function endGame() {
  gameEnd = true;
  const gameEndScreen = document.getElementById("gameEndScreen");
  gameEndScreen.style.display = "block";
}
