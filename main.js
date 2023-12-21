const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: '#3498db',
};


const foods = [];
const foodSize = 10;
const growthFactor = 1 / 8;
const foodInterval = 2000; // milliseconds


// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Create random food circle
function createFood() {
  const food = {
    x: getRandomNumber(foodSize, canvas.width - foodSize),
    y: getRandomNumber(foodSize, canvas.height - foodSize),
    radius: foodSize,
    color: '#e74c3c',
  };
  foods.push(food);
}


// Draw player on the canvas
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}


// Draw food circles on the canvas
function drawFoods() {
  foods.forEach(food => {
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
    ctx.fillStyle = food.color;
    ctx.fill();
    ctx.closePath();
  });
}


// Update player position to follow the mouse
function updatePlayerPosition(event) {
  player.x = event.clientX - canvas.getBoundingClientRect().left;
  player.y = event.clientY - canvas.getBoundingClientRect().top;
}


// Check if a point is inside a circle
function pointInsideCircle(x, y, circle) {
  const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
  return distance <= circle.radius;
}


// Handle collisions with food
function handleFoodCollisions() {
  for (let i = foods.length - 1; i >= 0; i--) {
    if (pointInsideCircle(player.x, player.y, foods[i])) {
      player.radius += foods[i].radius * growthFactor;
      foods.splice(i, 1);
    }
  }
}


// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawFoods();
  drawPlayer();
  handleFoodCollisions();


  requestAnimationFrame(gameLoop);
}


// Initialize the game
function init() {
  canvas.addEventListener('mousemove', updatePlayerPosition);
  setInterval(createFood, foodInterval);


  gameLoop();
}


// Run the game
init();
