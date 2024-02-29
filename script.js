// script.js
// Define variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let snake = [
  { x: 100, y: 100 },
  { x: 90, y: 100 },
  { x: 80, y: 100 },
];
let dx = 10;
let dy = 0;
let apple = { x: 300, y: 200 };
let score = 0;

// Handle window onload
window.onload = function() {
  draw();
  setInterval(update, 100);
};

// Draw the snake, apple, and score
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, 10, 10);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Update the game state
function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * (canvas.width - 10)) / 10 * 10,
      y: Math.floor(Math.random() * (canvas.height - 10)) / 10 * 10,
    };
  } else {
    snake.pop();
  }

  // Check for collisions with the canvas edges or the snake body
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert(`Game Over! Your final score is ${score}.`);
    location.reload();
  }
}

// Handle player key presses to change the snake's direction
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    dx = -10;
    dy = 0;
  } else if (event.key === "ArrowUp") {
    dx = 0;
    dy = -10;
  } else if (event.key === "ArrowRight") {
    dx = 10;
    dy
