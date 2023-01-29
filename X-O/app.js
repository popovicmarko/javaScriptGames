const squares = document.querySelectorAll('.square');
let xIsNext = true;

for (const square of squares) {
  square.addEventListener('click', function(event) {
    const target = event.target;
    if (target.textContent === '') {
      target.textContent = xIsNext ? 'X' : 'O';
      xIsNext = !xIsNext;
    }
  });
}
