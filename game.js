const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let dx = 1; let dy = 0; 
let score = 0;
let isPaused = false;
let isSoundOn = true;

const eatSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.mp3');

function draw() {
    if (isPaused) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // গোল সাপ আঁকা
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ffcc" : "#008866";
        ctx.beginPath();
        ctx.arc(part.x * 20 + 10, part.y * 20 + 10, 9, 0, 2 * Math.PI);
        ctx.fill();
    });

    // গোল খাবার আঁকা
    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 8, 0, 2 * Math.PI);
    ctx.fill();

    moveSnake();
    checkCollision();
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = score;
        if(isSoundOn) eatSound.play().catch(e => {});
        food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    } else {
        snake.pop();
    }
}

function changeDirection(dir) {
    if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
    if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
    if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
    if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
}

function pauseGame() { isPaused = !isPaused; }

function startGame() {
    document.getElementById("splash-screen").style.display = "none";
    setInterval(draw, 200); // গতি স্লো করা হয়েছে
}
