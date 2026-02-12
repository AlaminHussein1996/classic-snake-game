const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// সাপকে শুরুতেই ১ ঘর ডানে চলার নির্দেশ দেওয়া হয়েছে (dx:1)
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let dx = 1; let dy = 0; 
let score = 0;
let isPaused = false;

const eatSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.mp3');
let isSoundOn = true;

function toggleSound() {
    isSoundOn = !isSoundOn;
    document.getElementById("soundStatus").innerText = isSoundOn ? "🔊 সাউন্ড: চালু" : "🔇 সাউন্ড: বন্ধ";
}

function draw() {
    if (isPaused) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // সাপ আঁকা
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ffcc" : "#008866";
        ctx.fillRect(part.x * 20, part.y * 20, 18, 18);
    });

    // খাবার আঁকা
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

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
        food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)) {
        if(isSoundOn) gameOverSound.play().catch(e => {});
        alert("গেম ওভার! স্কোর: " + score);
        resetGame();
    }
}

function resetGame() {
    snake = [{x: 10, y: 10}]; dx = 1; dy = 0; score = 0;
    scoreElement.innerText = score;
}

function changeDirection(dir) {
    if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
    if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
    if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
    if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
}

function pauseGame() {
    isPaused = !isPaused;
}

function startGame() {
    document.getElementById("splash-screen").style.display = "none";
    setInterval(draw, 150);
}
