const cards = document.querySelectorAll('.memory-card');
let flippedCard = false;
let lockBoard = false;
let card1, card2;

function flipCard() {
  if (lockBoard) return;
  if (this === card1) return;
  this.classList.add('flip');
  if (!flippedCard) {
    flippedCard = true;
    card1 = this;
    return;
  }
    card2 = this;
    matchChecking();
}

// Ternary Operator
function matchChecking() {
  let isMatch = card1.dataset.framework === card2.dataset.framework;
  isMatch ? removeCards() : unflipCards();
}

function removeCards() {
  card1.removeEventListener('click', flipCard);
  card2.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
  card1.classList.remove('flip');
  card2.classList.remove('flip');
  resetBoard();
  }, 1500);
}

// Destructuring Assignment
function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [card1, card2] = [null, null];
}

// IIFE(Immediately Invoked Function Expression)
(function shuffle() {
  cards.forEach(card => {
    let positions = Math.floor(Math.random() * 12);
    card.style.order =positions;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));