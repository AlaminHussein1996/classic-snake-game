const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let dx = 0; let dy = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;

// আপনার আপলোড করা সাউন্ড ফাইলগুলো এখানে কানেক্ট করা হয়েছে
let isSoundOn = true;
const eatSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.mp3');

// সাউন্ড কন্ট্রোল করার ফাংশন
function toggleSound() {
    isSoundOn = !isSoundOn;
    document.getElementById("soundStatus").innerText = isSoundOn ? "🔊 সাউন্ড: চালু" : "🔇 সাউন্ড: বন্ধ";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // সাপ আঁকা (আপনার আগের ডিজাইন অনুযায়ী)
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

    // খাবার খাওয়ার সময় সাউন্ড বাজবে
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = score;
        
        if(isSoundOn) {
            eatSound.currentTime = 0; 
            eatSound.play().catch(e => console.log("Sound Error"));
        }
        
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
}

function checkCollision() {
    const head = snake[0];
    // দেয়াল বা শরীরে ধাক্কা লাগলে সাউন্ড বাজবে
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)) {
        
        if(isSoundOn) {
            gameOverSound.play().catch(e => console.log("Sound Error"));
        }
        
        resetGame();
    }
}

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreElement.innerText = highScore;
    }
    alert("গেম ওভার! আপনার স্কোর: " + score);
    snake = [{x: 10, y: 10}]; dx = 0; dy = 0; score = 0;
    scoreElement.innerText = score;
}

function changeDirection(dir) {
    if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
    if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
    if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
    if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
}

// স্প্ল্যাশ স্ক্রিন থেকে গেম শুরু করা
function startGame() {
    document.getElementById("splash-screen").style.display = "none";
    setInterval(draw, 150);
}
