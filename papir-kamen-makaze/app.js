const buttons = document.querySelectorAll('button');
const playerScoreDisplay = document.querySelector('#player-score');
const computerScoreDisplay = document.querySelector('#computer-score');
const resultDisplay = document.querySelector('#result');
let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 'Neriješeno!';
  } else if (playerSelection === 'rock' && computerSelection === 'scissors' ||
             playerSelection === 'paper' && computerSelection === 'rock' ||
             playerSelection === 'scissors' && computerSelection === 'paper') {
    playerScore++;
    return 'Pobjeda!';
  } else {
    computerScore++;
    return 'Poraz!';
  }
}

function computerPlay() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
  resultDisplay.textContent = '';
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerSelection = button.id;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = result;
    if (playerScore === 5 || computerScore === 5) {
      if (playerScore > computerScore) {
        resultDisplay.textContent = 'Čestitamo, pobijedili ste!';
      } else {
        resultDisplay.textContent = 'Žao nam je, izgubili ste.';
      }
      buttons.forEach(button));
